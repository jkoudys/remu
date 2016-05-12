// Flux
import Store from './Store';
import { register, waitFor } from '../dispatcher/AppDispatcher.js';
import { ActionTypes as AT } from '../constants/EmuConstants.js';
import * as EmuActions from '../actions/EmuActions.js';

// z80 emu
import GPU from '../utils/emulator/gpu.js';
import MMU from '../utils/emulator/mmu.js';
import Keypad from '../utils/emulator/Keypad.js';
import Timer from '../utils/emulator/Timer.js';
import Z80 from '../utils/emulator/z80.js';

// Helpers
import { supportedSystems, type } from '../utils/EmuHelper.js';

/**
 * Local variables to the store
 */
let _romFileName = '';
const _frameCounter = { start: 0, frames: 0 };
const _startTime = Date.now();

/**
 * @param int _fps Target fps - no need for this to be higher than what you can see
 * TODO: make this configurable, and potentially auto-set from WebGL-reported
 * framerate.
 */
let _fps = 60;

/**
 * setInterval IDs for polling processes
 * @param int _runInterval The interval of the actively running emulator
 * @param int _frameInterval The interval we poll to count FPS
 */
let _runInterval;
let _frameInterval;

/**
 * Pause all execution. Pause issued from emulator controls, not in-game
 */
function pauseEmulation() {
  clearInterval(_runInterval);
  clearInterval(_frameInterval);
  Z80.stop();
}

/**
 * Reset the emulator. A hard reset, equivalent to hitting power off/on
 */
function resetEmulation() {
  GPU.reset();
  MMU.reset();
  Z80.reset();
  Keypad.reset();
  Timer.reset();

  pauseEmulation();
}

/**
 * Start the emulator up!
 */
function runEmulation() {
  // Make sure we've started the CPU loop
  Z80.start();

  // Start running - we run as many cycles as the GB would normally in that time
  // Intervals' are in ms, so (1000 ms/s) / (60 frames/s) tells us how many ms
  // to run per frame.
  _runInterval = window.setInterval(executeFrame, 1000 / _fps);

  // Poll to see how many frames we've rendered
  _frameCounter.start = Date.now();
  _frameCounter.frames = 0;
  _frameInterval = window.setInterval(() => {
    const now = Date.now();
    EmuActions.refreshFps((_frameCounter.frames / (now - _frameCounter.start)) << 0);
    _frameCounter.start = now;
    _frameCounter.frames = 0;
  }, 2000);
}

/**
 * Receive the raw ROM data
 * @param ArrayBuffer buffer
 */
function receiveRom(buffer) {
  MMU.load(buffer);
}

/**
 * Attach the GPU to a canvas "screen"
 * @param HTMLCanvasElement canvas Our new screen
 */
function receiveCanvas(canvas) {
  GPU.attachCanvas(canvas);
}

/**
 * Execute a single 'frame' (one update of the actual screen, not the GB)
 */
function executeFrame() {
  // A separate 'frame clock', so we can run multiple z80 cycles per
  // frame we update to the canvas. Calculated as the number of GB cycles to
  // run between each emulator screen update.
  // (frames/s) / (clock speed in Hz) => GB clock ticks to run
  let fclock = Z80.speed / _fps;
  let clockTicks = 0;
  let opTicks = 0;

  do {
    if (Z80._halt) {
      opTicks = 1;
    } else {
      opTicks = Z80.exec();
    }
    if (Z80.isInterruptable() && MMU._ie && MMU._if) {
      const ifired = MMU._ie & MMU._if;
      Z80._halt = false;
      Z80.disableInterrupts();
      if (ifired & 0x01) {
        MMU._if &= 0xFE;
        Z80.rst(0x40);
      } else if (ifired & 0x02) {
        MMU._if &= 0xFD;
        Z80.rst(0x48);
      } else if (ifired & 0x04) {
        MMU._if &= 0xFB;
        Z80.rst(0x50);
      } else if (ifired & 0x08) {
        MMU._if &= 0xF7;
        Z80.rst(0x58);
      } else if (ifired & 0x10) {
        MMU._if &= 0xEF;
        Z80.rst(0x60);
      } else {
        Z80.enableInterrupts();
      }
    }
    clockTicks += opTicks;

    // Only render if we have a screen to render to
    if (GPU.isAttached()) {
      GPU.checkline(opTicks);
    }

    Timer.inc(opTicks);
    if (Z80.isStopped()) {
      pauseEmulation();
      break;
    }
    // Run until we need to update the screen again
  } while (clockTicks < fclock);

  // fclock divided into 1000 frame segments
  _frameCounter.frames += fclock;
}

const EmuStore = Object.assign({}, Store, {
  isRomLoaded: () => !!MMU._rom,
  getRom: () => MMU._rom,

  /**
   * Get the basic info on this ROM
   * @return object Paremeters of ROM metadata, e.g. name, size, etc.
   */
  getRomInfo() {
    if (MMU._rom) {
      return {
        name: String.fromCharCode(...MMU._rom.subarray(0x0134, 0x0144)),
        systems: supportedSystems(MMU._rom),
        type: type(MMU._rom),
        filename: _romFileName,
        size: MMU._rom.length,
      };
    }
    return null;
  },

  /**
   * Get the current state of the registers
   * @return object Registers
   */
  getRegisters: () => Z80.getRegisters(),

  dispatchToken: register({
    [AT.ROM_RECEIVE]: ({ rom, filename }) => {
      resetEmulation();
      receiveRom(rom);
      _romFileName = filename;
      runEmulation();
    },
    [AT.EMU_RESET]: () => resetEmulation(),
    [AT.EMU_PAUSE]: () => pauseEmulation(),
    [AT.EMU_RUN]: () => runEmulation(),
    [AT.FPS_RECEIVE]: ({ fps }) => { _fps = fps; },
    [AT.SCREEN_CANVAS_RECEIVE]: ({ canvas }) => receiveCanvas(canvas),
  }, () => EmuStore.emitChange()),
});

export default EmuStore;
