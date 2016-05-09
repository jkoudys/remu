import { ActionTypes } from '../constants/EmuConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

/**
 * Add a log entry
 * @param string module
 * @param string msg
 */
export function log(component, msg) {
  AppDispatcher.dispatch({
    type: ActionTypes.LOG_APPEND,
    time: Date.now(),
    component,
    msg,
  });
}
