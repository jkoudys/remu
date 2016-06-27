/**
 * The bounds for various memory regions.
 * Nice to avoid magic-numbering all over the place.
 * Uses the same approach as Array#split, so the last byte is one _less than_ the max.
 */

export default {
  // [0000-3FFF] Cartridge ROM, bank 0: The first 16,384 bytes of the cartridge program are always available at this point in the memory map. Special circumstances apply:
  rom0: [0x0000, 0x4000],
  // [0000-00FF] BIOS: When the CPU starts up, PC starts at 0000h, which is the start of the 256-byte GameBoy BIOS code. Once the BIOS has run, it is removed from the memory map, and this area of the cartridge rom becomes addressable.
  bios: [0x0000, 0x0100],
  // [0100-014F] Cartridge header: This section of the cartridge contains data about its name and manufacturer, and must be written in a specific format.
  header: [0x0100, 0x0150],
  // [4000-7FFF] Cartridge ROM, other banks: Any subsequent 16k "banks" of the cartridge program can be made available to the CPU here, one by one; a chip on the cartridge is generally used to switch between banks, and make a particular area accessible. The smallest programs are 32k, which means that no bank-selection chip is required.
  rom1: [0x4000, 0x8000],
  // [8000-9FFF] Graphics RAM: Data required for the backgrounds and sprites used by the graphics subsystem is held here, and can be changed by the cartridge program. This region will be examined in further detail in part 3 of this series.
  graphicsRam: [0x8000, 0xA000],
  // [A000-BFFF] Cartridge (External) RAM: There is a small amount of writeable memory available in the GameBoy; if a game is produced that requires more RAM than is available in the hardware, additional 8k chunks of RAM can be made addressable here.
  cartridgeRam: [0xA000, 0xC000],
  // [C000-DFFF] Working RAM: The GameBoy's internal 8k of RAM, which can be read from or written to by the CPU.
  workingRam: [0xC000, 0xE000],
  // [E000-FDFF] Working RAM (shadow): Due to the wiring of the GameBoy hardware, an exact copy of the working RAM is available 8k higher in the memory map. This copy is available up until the last 512 bytes of the map, where other areas are brought into access.
  shadowRam: [0xE000, 0xFE00],
  // [FE00-FE9F] Graphics: sprite information: Data about the sprites rendered by the graphics chip are held here, including the sprites' positions and attributes.
  sprites: [0xFE00, 0xFEA0],
  // [FF00-FF7F] Memory-mapped I/O: Each of the GameBoy's subsystems (graphics, sound, etc.) has control values, to allow programs to create effects and use the hardware. These values are available to the CPU directly on the address bus, in this area.
  io: [0xFF00, 0xFF80],
  // [FF80-FFFF] Zero-page RAM: A high-speed area of 128 bytes of RAM is available at the top of memory. Oddly, though this is "page" 255 of the memory, it is referred to as page zero, since most of the interaction between the program and the GameBoy hardware occurs through use of this page of memory.
  zeroPage: [0xFF80, 0x10000],
};
