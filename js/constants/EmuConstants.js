const ActionTypes = [
  'ROM_RECEIVE',
  'EMU_RESET',
  'EMU_PAUSE',
  'EMU_RUN',
  'FPS_RECEIVE',
  'CANVAS_RECEIVE',
  'LOG_APPEND'
].reduce((o, k) => {o[k] = k; return o}, {});

export {ActionTypes};
