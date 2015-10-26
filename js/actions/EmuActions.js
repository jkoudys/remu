import {ActionTypes} from '../constants/EmuConstants.js';
import {dispatch} from '../dispatcher/AppDispatcher.js';

export function pause() {
  dispatch({
    type: ActionTypes.EMU_PAUSE
  });
}

export function reset() {
  dispatch({
    type: ActionTypes.EMU_RESET
  });
}

export function refreshFps(fps) {
  dispatch({
    type: ActionTypes.FPS_REFRESH,
    fps: fps
  });
}

/**
 * Receives binary ROM data
 * @param arraybuffer rom Binary buffer of the ROM
 * @param string filename Optional filename of the ROM
 */
export function receiveRom(rom, filename) {
  dispatch({
    type: ActionTypes.ROM_RECEIVE,
    rom: rom,
    filename: filename
  });
}

/**
 * Receives our canvas
 * @param HTMLCanvasElement canvas
 */
export function receiveCanvas(canvas) {
  dispatch({
    type: ActionTypes.CANVAS_RECEIVE,
    canvas: canvas
  });
}
