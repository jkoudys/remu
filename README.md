# remu
ReactJS powered multi-system emulator framework, built on modern JavaScript with WebGL

## Design Principles
1. Implement a ReactJS and flux-powered pattern.
  * Keeps menu components completely separate from the underlying emulator.
  * No `document.getElementById()` and especially no `jQuery()` should exist inside of emulator code.
2. Use ArrayBuffer with TypedArrays (e.g. Uint8Array).
  * Quickly and accurately models memory space.
  * Don't `<< 8` and `& 0xFF` all over the place - model registers and memory as the type they are, instead.
3. Use modern WebGL, including pixel shaders, to move as much of the graphical heavy lifting.
  * This is a big advantage of going in-browser: graceful degradation is easier to implement.
  * No need to install 3rd-party rendering libs, either.
4. Speed and playing experience are more important than doing things exactly the same way as the original hardware.
  * Dynamic recompiling should be considered upfront, not as an afterthought.
  * Even if it's more authentic, jittery background scrolling and maximum tiles per line limits should be avoided in favour of a more modern experience.
  * The goal is to provide a performant, enjoyable, modern experience.
