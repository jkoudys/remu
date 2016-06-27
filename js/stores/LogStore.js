// Flux
import Store from './Store';
import { register } from '../dispatcher/AppDispatcher';
import { ActionTypes as AT } from '../constants/EmuConstants';

/**
 * Local variables to the store
 */
const _log = [];

const LogStore = {
  ...Store,
  /**
   * Gets the runtime log
   * @return array<object>
   */
  getLog() {
    return _log;
  },

  dispatcherIndex: register({
    [AT.LOG_APPEND]: ({ msg, component, time }) => _log.push({ msg, component, time }),
  }, () => LogStore.emitChange()),
};

export default LogStore;
