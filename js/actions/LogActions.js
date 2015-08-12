import {ActionTypes} from '../constants/EmuConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import EmuStore from '../stores/EmuStore.js';

/**
 * Add a log entry
 * @param string module
 * @param string msg
 */
export function log(component, msg) {
  AppDispatcher.waitFor([EmuStore.dispatchToken]);
  AppDispatcher.dispatch({
    type: ActionTypes.LOG_APPEND,
    component: component,
    msg: msg
  });
}
