/**
 * Game Boy Keypad
 * Set as a single byte of bit-flags for each of the 8 possible keys.
 * Odd in that it's a high state (1) that represents a button is not pressed.
 * 1980s technology is notoriously unkind to software developers in the distant
 * future.
 */

// Flux
import { log } from '../../actions/LogActions.js';

// A byte with each bit representing one of the 8 keys
let keys = 0x00;

// Map of the keyboard keycodes to the GB Keypad input
// TODO: This is where a configurable keyboard would go
const keyMap = new Map([
  // Right
  [39, 0x01],
  // Left
  [37, 0x02],
  // Up
  [38, 0x04],
  // Down
  [40, 0x08],
  // A
  [90, 0x10],
  // B
  [88, 0x20],
  // Select
  [32, 0x40],
  // Start
  [13, 0x80],
]);

// TODO: I'm still not entirely sure why we need this.
let colidx = 0;

const Keypad = {
  reset() {
    keys = 0x00;
    colidx = 0;
    setTimeout(log, 1, 'keypad', 'Reset');
  },

  rb() {
    switch (colidx) {
      case 0x10:
        return keys & 0x0F;
      case 0x20:
        return (keys & 0xF0) >> 8;
      default:
        return 0x00;
    }
  },

  wb(v) {
    colidx = v & 0x30;
  },

  keydown({ keyCode }) {
    const bit = keyMap.get(keyCode);
    // Set bit to 0, to show it's pressed
    if (bit) keys &= ~keyCode;
  },

  keyup({ keyCode }) {
    const bit = keyMap.get(keyCode);
    // Put the bit back to 1, to show it's not pressed
    if (bit) keys |= keyCode;
  },
};

export default Keypad;
