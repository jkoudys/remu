export const ActionTypes = [
  'ROM_RECEIVE',
  'EMU_RESET',
  'EMU_PAUSE',
  'EMU_RUN',
  'FPS_RECEIVE',
  'SCREEN_CANVAS_RECEIVE',
  'SCREEN_CANVAS_CLEAR',
  'LOG_APPEND',
].reduce((o, k) => {o[k] = k; return o;}, {});
