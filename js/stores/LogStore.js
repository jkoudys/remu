// Flux
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/EmuConstants.js';
import EmuStore from './EmuStore.js';

// Basic event name for basic emulator state change
const CHANGE_EVENT = 'change';

/**
 * Local variables to the store
 */
const _log = [];

/**
 * Add to the runtime log
 * @param string msg The message to save
 * @param string component Optional module name that set the message
 */
function appendToLog(msg, component) {
    let entry = {time: Date.now(), component: component, msg: msg};
    _log.push(entry);
    console.log(entry);
}

const LogStore = Object.assign({}, EventEmitter.prototype, {
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
   * Gets the runtime log
   * @return array<object>
   */
  getLog() {
    return _log;
  }
});

LogStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch (payload.type) {
    case ActionTypes.LOG_APPEND:
      appendToLog(payload.msg, payload.component);
      LogStore.emitChange();
      break;
  }
});

export default LogStore;
