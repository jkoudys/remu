import { ActionTypes } from '../constants/EmuConstants.js';
import { dispatch } from '../dispatcher/AppDispatcher.js';

export function pause() {
  dispatch({
    type: ActionTypes.EMU_PAUSE,
  });
}

export function reset() {
  dispatch({
    type: ActionTypes.EMU_RESET,
  });
}

export function refreshFps(fps) {
  dispatch({
    type: ActionTypes.FPS_REFRESH,
    fps,
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
    rom,
    filename,
  });
}
