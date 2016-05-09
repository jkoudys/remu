/**
 * GameBoy Emulator, main app
 */
import React from 'react';
import { render } from 'react-dom';

import Keypad from './utils/emulator/Keypad.js';
import GameBoy from './components/GameBoy.jsx';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <GameBoy />,
    document.getElementById('reactboy')
  );

  // Bind keyboard to the GB keypad
  window.addEventListener('keyup', Keypad.keyup);
  window.addEventListener('keydown', Keypad.keydown);
});
