/**
 * Look for a null-terminated string over a memory extent
 * @param arraylike array The array/TypedArray to iterate through
 * @return string
 */
export function stringify(array) {
  let retStr = '';

  for (var i = 0, len = array.length; i < len && array[i] !== 0; i++) {
    retStr += String.fromCharCode(array[i]);
  }

  return retStr;
}

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
export function type(rom) {
  switch (rom[0x0147]) {
    case 0x00:
      return 'ROM ONLY';
    break;
    case 0x01:
      return 'MBC1';
    break;
    case 0x02:
      return 'MBC1 RAM';
    break;
    case 0x03:
      return 'MBC1 RAM BATTERY';
    break;
    case 0x05:
      return 'MBC2';
    break;
    case 0x06:
      return 'MBC2 BATTERY';
    break;
    case 0x08:
      return 'ROM RAM';
    break;
    case 0x09:
      return 'ROM RAM BATTERY';
    break;
    case 0x0B:
      return 'MMM01';
    break;
    case 0x0C:
      return 'MMM01 RAM';
    break;
    case 0x0D:
      return 'MMM01 RAM BATTERY';
    break;
    case 0x0F:
      return 'MBC3 TIMER BATTERY';
    break;
    case 0x10:
      return 'MBC3 TIMER RAM BATTERY';
    break;
    case 0x11:
      return 'MBC3';
    break;
    case 0x12:
      return 'MBC3 RAM';
    break;
    case 0x13:
      return 'MBC3 RAM BATTERY';
    break;
    case 0x15:
      return 'MBC4';
    break;
    case 0x16:
      return 'MBC4 RAM';
    break;
    case 0x17:
      return 'MBC4 RAM BATTERY';
    break;
    case 0x19:
      return 'MBC5';
    break;
    case 0x1A:
      return 'MBC5 RAM';
    break;
    case 0x1B:
      return 'MBC5 RAM BATTERY';
    break;
    case 0x1C:
      return 'MBC5 RUMBLE';
    break;
    case 0x1D:
      return 'MBC5 RUMBLE RAM';
    break;
    case 0x1E:
      return 'MBC5 RUMBLE RAM BATTERY';
    break;
    case 0xFC:
      return 'POCKET CAMERA';
    break;
    case 0xFD:
      return 'BANDAI TAMA5';
    break;
    case 0xFE:
      return 'HUC3';
    break;
    case 0xFF:
      return 'HUC1 RAM BATTERY';
    break;
  }
}
