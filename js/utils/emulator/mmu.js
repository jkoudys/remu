/**
 * The memory management
 * TODO: This is mostly from the jsemu project and still needs a lot of work
 * to take full advantage of typed arrays and imports
 */
// Flux
import { log } from '../../actions/LogActions.js';

// Game Boy
import GPU from './gpu.js';
import Z80 from './z80.js';
import Keypad from './Keypad.js';
import Timer from './Timer.js';

import bios from './data/bios';

const blankMMU = {
  _wram: new Uint8Array(0x2000),
  _eram: new Uint8Array(0x8000),
  _zram: new Uint8Array(0x7f),

  _inbios: 1,
  _ie: 0,
  _if: 0,

  _carttype: 0,
  _mbc: [{}, {
    rombank: 0,
    rambank: 0,
    ramon: 0,
    mode: 0,
  }],
  _romoffs: 0x4000,
  _ramoffs: 0,
};

const MMU = {
  _bios: bios,
  _rom: null,

  /**
   * Getters
   */
  getRom: () => MMU._rom,

  reset() {
    Object.assign(MMU, blankMMU),

    setTimeout(log, 1, 'mmu', 'Reset');
  },

  /**
   * Load a buffer as the ROM
   * @param ArrayBuffer buffer The ROM itself
   */
  load(buffer) {
    MMU._rom = new Uint8Array(buffer);
    MMU._carttype = MMU._rom[0x0147];

    setTimeout(log, 1, 'mmu', `ROM loaded, ${MMU._rom.length} bytes`);
  },

  rb(addr) {
    // TODO: this could be _way_ simpler if simply using a DataView
    switch (addr & 0xF000) {
      // ROM bank 0
      case 0x0000:
        if (MMU._inbios) {
          if (addr < 0x0100) return MMU._bios[addr];
          else if (Z80.getPC() === 0x0100) {
            MMU._inbios = 0;
            setTimeout(log, 1, 'mmu', 'Leaving BIOS');
          }
        } else {
          return MMU._rom[addr];
        }

      case 0x1000:
      case 0x2000:
      case 0x3000:
        return MMU._rom[addr];

        // ROM bank 1
      case 0x4000:
      case 0x5000:
      case 0x6000:
      case 0x7000:
        return MMU._rom[MMU._romoffs + (addr & 0x3FFF)];

        // VRAM
      case 0x8000:
      case 0x9000:
        return GPU.getVram(addr & 0x1FFF);

        // External RAM
      case 0xA000:
      case 0xB000:
        return MMU._eram[MMU._ramoffs + (addr & 0x1FFF)];

        // Work RAM and echo
      case 0xC000:
      case 0xD000:
      case 0xE000:
        return MMU._wram[addr & 0x1FFF];

        // Everything else
      case 0xF000:
        switch (addr & 0x0F00) {
          // Echo RAM
          case 0x000:
          case 0x100:
          case 0x200:
          case 0x300:
          case 0x400:
          case 0x500:
          case 0x600:
          case 0x700:
          case 0x800:
          case 0x900:
          case 0xA00:
          case 0xB00:
          case 0xC00:
          case 0xD00:
            return MMU._wram[addr & 0x1FFF];

            // OAM
          case 0xE00:
            return ((addr & 0xFF) < 0xA0) ? GPU._oam[addr & 0xFF] : 0;

            // Zeropage RAM, I/O, interrupts
          case 0xF00:
            if (addr === 0xFFFF) {
              return MMU._ie;
            } else if (addr > 0xFF7F) {
              return MMU._zram[addr & 0x7F];
            } else {
              switch (addr & 0xF0) {
                case 0x00:
                  switch (addr & 0xF) {
                    case 0:
                      return Keypad.rb(); // JOYP
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                      return Timer.rb(addr);
                    case 15:
                      return MMU._if; // Interrupt flags
                    default:
                      return 0;
                  }

                case 0x10:
                case 0x20:
                case 0x30:
                  return 0;

                case 0x40:
                case 0x50:
                case 0x60:
                case 0x70:
                  return GPU.rb(addr);
              }
            }
        }
        break;
    }
  },

  rw(addr) {
    // TODO: this could be _way_ simpler if simply using a DataView
    return MMU.rb(addr) + (MMU.rb(addr + 1) << 8);
  },

  wb(addr, val) {
    switch (addr & 0xF000) {
      // ROM bank 0
      // MBC1: Turn external RAM on
      case 0x0000:
      case 0x1000:
        switch (MMU._carttype) {
          case 1:
            MMU._mbc[1].ramon = ((val & 0xF) === 0xA) ? 1 : 0;
            break;
        }
        break;

        // MBC1: ROM bank switch
      case 0x2000:
      case 0x3000:
        switch (MMU._carttype) {
          case 1:
            MMU._mbc[1].rombank &= 0x60;
            val &= 0x1F;
            if (!val) val = 1;
            MMU._mbc[1].rombank |= val;
            MMU._romoffs = MMU._mbc[1].rombank * 0x4000;
            break;
        }
        break;

        // ROM bank 1
        // MBC1: RAM bank switch
      case 0x4000:
      case 0x5000:
        switch (MMU._carttype) {
          case 1:
            if (MMU._mbc[1].mode) {
              MMU._mbc[1].rambank = (val & 3);
              MMU._ramoffs = MMU._mbc[1].rambank * 0x2000;
            } else {
              MMU._mbc[1].rombank &= 0x1F;
              MMU._mbc[1].rombank |= ((val & 3) << 5);
              MMU._romoffs = MMU._mbc[1].rombank * 0x4000;
            }
        }
        break;

      case 0x6000:
      case 0x7000:
        switch (MMU._carttype) {
          case 1:
            MMU._mbc[1].mode = val & 1;
            break;
        }
        break;

        // VRAM
      case 0x8000:
      case 0x9000:
        GPU.setVram(addr & 0x1FFF, val);
        break;

        // External RAM
      case 0xA000:
      case 0xB000:
        MMU._eram[MMU._ramoffs + (addr & 0x1FFF)] = val;
        break;

        // Work RAM and echo
      case 0xC000:
      case 0xD000:
      case 0xE000:
        MMU._wram[addr & 0x1FFF] = val;
        break;

        // Everything else
      case 0xF000:
        switch (addr & 0x0F00) {
          // Echo RAM
          case 0x000:
          case 0x100:
          case 0x200:
          case 0x300:
          case 0x400:
          case 0x500:
          case 0x600:
          case 0x700:
          case 0x800:
          case 0x900:
          case 0xA00:
          case 0xB00:
          case 0xC00:
          case 0xD00:
            MMU._wram[addr & 0x1FFF] = val;
            break;

            // OAM
          case 0xE00:
            if ((addr & 0xFF) < 0xA0) GPU._oam[addr & 0xFF] = val;
            GPU.updateoam(addr, val);
            break;

            // Zeropage RAM, I/O, interrupts
          case 0xF00:
            if (addr === 0xFFFF) {
              MMU._ie = val;
            } else if (addr > 0xFF7F) {
              MMU._zram[addr & 0x7F] = val;
            } else {
                switch (addr & 0xF0) {
                case 0x00:
                  switch (addr & 0xF) {
                    case 0:
                      Keypad.wb(val);
                      break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                      Timer.wb(addr, val);
                      break;
                    case 15:
                      MMU._if = val;
                      break;
                  }
                  break;

                case 0x10:
                case 0x20:
                case 0x30:
                  break;

                case 0x40:
                case 0x50:
                case 0x60:
                case 0x70:
                  GPU.wb(addr, val);
                  break;
              }
            }
        }
        break;
    }
  },

  ww(addr, val) {
    MMU.wb(addr, val & 0xFF);
    MMU.wb(addr + 1, val >> 8);
  },
};

// Start out reset
MMU.reset();

export default MMU;
