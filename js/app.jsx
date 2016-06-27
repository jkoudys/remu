/**
 * GameBoy Emulator, main app
 */
import React from 'react';
import { render } from 'react-dom';

import Keypad from './utils/emulator/Keypad';
import GameBoy from './components/GameBoy.jsx';

import MemoryStore from './stores/gb/MemoryStore';

// Bind keyboard to the GB keypad
window.addEventListener('keyup', Keypad.keyup);
window.addEventListener('keydown', Keypad.keydown);

// Render React
document.addEventListener('DOMContentLoaded', () => {
  console.log(MemoryStore.isRomLoaded());
  render(
    <GameBoy />,
    document.getElementById('reactboy')
  );
});
