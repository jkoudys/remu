import { Component, createElement as ce } from 'react';
import { findDOMNode } from 'react-dom';

import { receiveCanvas, clearCanvas } from '../actions/ScreenActions';

const { assign, create } = Object;

export default function Screen(props) {
  Component.call(this, props);
}
Screen.prototype = assign(create(Component.prototype), {
  // TODO: this component's mounted by the ROM_RECEIVE action, so we need to
  // put it outside that call to dispatch the canvas receive.
  // Maybe canvases should be managed by the emu, and attached in the component on mount instead?
  componentDidMount() {
    setTimeout(() => receiveCanvas(findDOMNode(this)));
  },

  componentWillUnmount: clearCanvas,

  render: () => ce('canvas', { className: 'screen' }),
});
