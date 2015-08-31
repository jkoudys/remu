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
var _romFileName = '';
const _frameCounter = {start: 0, frames: 0};
var _startTime = Date.now();
const _log = [];

/**
 * @param int _fps Target fps - no need for this to be higher than what you can see
 * TODO: make this configurable, and potentially auto-set from WebGL-reported
 * framerate.
 */
var _fps = 60;

/**
 * setInterval IDs for polling processes
 * @param int _runInterval The interval of the actively running emulator
 * @param int _frameInterval The interval we poll to count FPS
 */
var _runInterval;
var _frameInterval;

/**
 * The callback for logging. Typically set with bind() before passing
 * @param string component The "component" (in the hardware sense) being logged
 * @param object err Callback error
 * @param object data Data returned to log
 */
function logExec(component, err, data) {
  var entry = {
    time: Date.now() - _startTime,
    component: component
  };

  if (err) {
    entry.msg = err.msg;
    entry.level = 'error';
  } else {
    entry.msg = data;
    entry.level = 'info';
  }

  _log.push(entry);
}

/**
 * Pause all execution. Pause issued from emulator controls, not in-game
 */
function pauseEmulation() {
  window.clearInterval(_runInterval);
  window.clearInterval(_frameInterval);
  Z80._stop = 1;
}

/**
 * Reset the emulator. A hard reset, equivalent to hitting power off/on
 */
function resetEmulation() {
  GPU.reset(logExec.bind(null, 'gpu'));
  MMU.reset(logExec.bind(null, 'mmu'));
  Z80.reset(logExec.bind(null, 'z80'));
  Keypad.reset(logExec.bind(null, 'keypad'));
  Timer.reset(logExec.bind(null, 'timer'));

  pauseEmulation();
}

/**
 * Start the emulator up!
 */
function runEmulation() {
  // Clear the 'stopped' status'
  Z80._stop = 0;

  // Start running - we run as many cycles as the GB would normally in that time
  // Intervals' are in ms, so (1000 ms/s) / (60 frames/s) tells us how many ms
  // to run per frame.
  _runInterval = window.setInterval(executeFrame, 1000 / _fps);

  // Poll to see how many frames we've rendered
  _frameCounter.start = Date.now();
  _frameCounter.frames = 0;
  _frameInterval = window.setInterval(function() {
    var now = Date.now();
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
  MMU.load(buffer, logExec.bind(null, 'mmu'));
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
  var fclock = Z80.speed / _fps;
  var clockTicks = 0;
  var opTicks = 0;
  do {
    if (Z80._halt) {
      opTicks = 1;
    } else {
      opTicks = Z80.exec();
    }
    if (Z80.isInterruptable() && MMU._ie && MMU._if) {
      Z80._halt = false;
      Z80.disableInterrupts();
      var ifired = MMU._ie & MMU._if;
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
    if (Z80._stop) {
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
