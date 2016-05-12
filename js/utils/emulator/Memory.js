/**
 * The MMU - manages our Game Boy memory
 * Heavily uint8-based, but cannot be modelled as a contiguous block
 * as the Game Boy's MMU has a special chip for what's known as "bank-swiching"
 */
import Store from '../../stores/Store';
import { register } from '../../dispatcher/AppDispatcher.js';
import { ActionTypes as AT } from '../../constants/EmuConstants.js';

import MR from './data/memoryRegions';
import bios from './data/bios';

// The whole cartridge, split into banks. Array index is bank #
const _rom = [];
// Header (in bank 0)
let _header;
// Are we currently booting up?
let _inBios = true;
// The memory extents, indexed by name of Memory Region
const _extents = {};
// Binding extents to memory region, with tuples of address and region [min, max, region]
const _bounds = [];

// Build an array buffer for the extent defined by the tuple
const createExtent = ([min, max]) => new Uint8Array(max - min);

// RAM regions
function buildExtents() {
  const workingRam = createExtent(MR.workingRam);
  // Shadow RAM "shadows" the working RAM, but is missing some bytes off the end
  const shadowRam = workingRam.subarray(0, MR.shadowRam[1] - MR.shadowRam[0]);
  const extents = {};

  // Load the first 2 banks of ROM into our addressable space
  for (let i = 0; i < _rom.length && i < 2; i++) {
    extents[`rom${i}`] = _rom[i];
  }

  return Object.assign(extents, {
    graphicsRam: createExtent(MR.graphicsRam),
    cartridgeRam: createExtent(MR.cartridgeRam),
    workingRam,
    shadowRam,
    sprites: createExtent(MR.sprites),
    io: createExtent(MR.io),
    zeroPage: createExtent(MR.zeroPage),
  });
}

const buildBounds = (extents) => [
  // Loads with the bios, but removed once loaded
  [...MR.bios, bios],
  ...Object.keys(extents).map(k => [...MR[k], extents[k]]),
];

// Reset the memory space, but keep the ROM loaded
function reset() {
  _inBios = true;
  Object.assign(_extents, buildExtents());
  // Empty the bounds to add new ones to it
  _bounds.length = 0;
  _bounds.push(...buildBounds(_extents));
}

/**
 * Grab the region associated with this fetch
 * @param int addr The memory address, 0x0000 to 0xFFFF
 * @return [int min, int max, TypedArray region]
 */
const fetchRegion = addr => _bounds.find(([min, max]) => addr >= min && addr < max);

const MemoryStore = Object.assign({}, Store, {
  isRomLoaded: () => !!_rom.length,
  getRom: () => _rom,
  getHeader: () => _header,

  // Read a single byte
  readByte(addr) {
    const [min, , region] = fetchRegion(addr);
    return region[addr - min];
  },

  // Read a word (16-bit)
  readWord(addr) {
    const [min, , region] = fetchRegion(addr);
    return (new Uint16Array(region.buffer))[(addr - min) / 2];
  },

  // We don't strictly follow a traditional flux pattern, because the
  // overhead of dispatching on every single byte write is way too much.
  // Write a byte
  writeByte(addr, val = 0) {
    const [min, , region] = fetchRegion(addr);
    region[addr - min] = val;

    // TODO: bank switching
  },

  // Write a word
  writeWord(addr, val = 0) {
    const [min, , region] = fetchRegion(addr);
    const region16 = new Uint16Array(region.buffer);
    region16[(addr - min) / 2] = val;
  },

  dispatchToken: register({
    [AT.EMU_RESET]: reset,
    [AT.ROM_RECEIVE]: ({ rom }) => {
      const bankSize = MR.rom0[1] - MR.rom0[0];
      // Load our rom as banks split across 16kB chunks
      for (let i = 0; i < rom.byteLength; i += bankSize) {
        _rom.push(new Uint8Array(rom, i, bankSize));
      }
      // Load all the mapped-areas of the ROM
      _header = _rom[0].subarray(...MR.header);

      reset();
    },
  }, () => MemoryStore.emitChange()),
});

export default MemoryStore;
