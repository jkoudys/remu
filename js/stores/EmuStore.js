// Flux
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/EmuConstants.js';
import * as EmuActions from '../actions/EmuActions.js';

// z80 emu
import GPU from '../utils/emulator/gpu.js';
import MMU from '../utils/emulator/mmu.js';
import Keypad from '../utils/emulator/Keypad.js';
import Timer from '../utils/emulator/Timer.js';
import Z80 from '../utils/emulator/z80.js';

// Helpers
import * as eh from '../utils/EmuHelper.js';

// Basic event name for basic emulator state change
const CHANGE_EVENT = 'change';

/**
 * Local variables to the store
 */
let _romFileName = '';
const _frameCounter = {start: 0, frames: 0};
let _startTime = Date.now();

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
 * Refresh our FPS counter
 */
function receiveFps() {
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
      let ifired = MMU._ie & MMU._if;
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

const EmuStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Get the basic info on this ROM
   * @return object Paremeters of ROM metadata, e.g. name, size, etc.
   */
  getRomInfo() {
    if (MMU._rom) {
      return {
        name: eh.stringify(MMU._rom.subarray(0x0134, 0x0144)),
        systems: eh.supportedSystems(MMU._rom),
        type: eh.type(MMU._rom),
        filename: _romFileName,
        size: MMU._rom.length
      }
    } else {
      return null;
    }
  },

  isRomLoaded() {
    return !!MMU._rom;
  },

  /**
   * Get the current state of the registers
   * @return object Registers
   */
  getRegisters() {
    return Z80.getRegisters();
  },

  /**
   * Get our runtime log
   * @return {array<object>}
   */
  getLog() {
    return _log;
  }
});

EmuStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch (payload.type) {
    case ActionTypes.ROM_RECEIVE:
      resetEmulation();
      receiveRom(payload.rom);
      _romFileName = payload.filename;
      runEmulation();
      EmuStore.emitChange();
      break;
    case ActionTypes.EMU_RESET:
      resetEmulation();
      EmuStore.emitChange();
      break;
    case ActionTypes.EMU_PAUSE:
      pauseEmulation();
      EmuStore.emitChange();
      break;
    case ActionTypes.EMU_RUN:
      runEmulation();
      EmuStore.emitChange();
      break;
    case ActionTypes.FPS_RECEIVE:
      EmuStore.emitChange();
      break;
    case ActionTypes.CANVAS_RECEIVE:
      receiveCanvas(payload.canvas);
      EmuStore.emitChange();
      break;
  }
});

export default EmuStore;
