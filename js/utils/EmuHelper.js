/**
 * Check what platforms this rom supports - game boy, gameboy colour, super game boy.
 * We give an array back, so the frontend code can decide how to show it.
 * @param Uint8Array rom The full ROM
 * @return array<string> Set of supported platforms
 */
export function supportedSystems(rom) {
  const supported = [];

  // First check the GB/GBC flag
  switch (rom[0x0143]) {
    case 0x00:
      // Game Boy only
      supported.push('GB');
    break;
    case 0x80:
      // Game Boy and GameBoy Color
      supported.push('GB', 'GBC');
    break;
    case 0xC0:
      // GameBoy Color only
      supported.push('GBC');
    break;
  }

  // Super Game Boy is a separate flag, so check next
  if (rom[0x0146] === 0x03) {
    supported.push('SGB');
  }

  return supported;
}

/**
 * Find the 'rom type', ie rom/ram/battery pack support
 * @param Uint8Array rom The ROM
 * @return string The ROM type
 */
const ROM_TYPES = new Map([
  [0x00, 'ROM ONLY'],
  [0x01, 'MBC1'],
  [0x02, 'MBC1 RAM'],
  [0x03, 'MBC1 RAM BATTERY'],
  [0x05, 'MBC2'],
  [0x06, 'MBC2 BATTERY'],
  [0x08, 'ROM RAM'],
  [0x09, 'ROM RAM BATTERY'],
  [0x0B, 'MMM01'],
  [0x0C, 'MMM01 RAM'],
  [0x0D, 'MMM01 RAM BATTERY'],
  [0x0F, 'MBC3 TIMER BATTERY'],
  [0x10, 'MBC3 TIMER RAM BATTERY'],
  [0x11, 'MBC3'],
  [0x12, 'MBC3 RAM'],
  [0x13, 'MBC3 RAM BATTERY'],
  [0x15, 'MBC4'],
  [0x16, 'MBC4 RAM'],
  [0x17, 'MBC4 RAM BATTERY'],
  [0x19, 'MBC5'],
  [0x1A, 'MBC5 RAM'],
  [0x1B, 'MBC5 RAM BATTERY'],
  [0x1C, 'MBC5 RUMBLE'],
  [0x1D, 'MBC5 RUMBLE RAM'],
  [0x1E, 'MBC5 RUMBLE RAM BATTERY'],
  [0xFC, 'POCKET CAMERA'],
  [0xFD, 'BANDAI TAMA5'],
  [0xFE, 'HUC3'],
  [0xFF, 'HUC1 RAM BATTERY'],
]);

export function type(rom) {
  return ROM_TYPES.get(rom[0x0147]);
}
