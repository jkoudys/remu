import { ActionTypes } from '../constants/EmuConstants.js';
import { dispatch } from '../dispatcher/AppDispatcher.js';

/**
 * Receives our canvas
 * @param HTMLCanvasElement canvas
 */
export function receiveCanvas(canvas) {
  dispatch({
    type: ActionTypes.SCREEN_CANVAS_RECEIVE,
    canvas,
  });
}

/**
 * Remove the active canvas
 */
export function clearCanvas() {
  dispatch({
    type: ActionTypes.SCREEN_CANVAS_CLEAR,
  });
}
