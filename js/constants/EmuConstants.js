export const ActionTypes = (function() {
  var actions = {};
  [
    'ROM_RECEIVE',
    'EMU_RESET',
    'EMU_PAUSE',
    'EMU_RUN',
    'FPS_RECEIVE',
    'LOG_APPEND'
  ].forEach((val) => { actions[val] = val; });
  return actions;
})();
