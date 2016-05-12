import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { receiveCanvas, clearCanvas } from '../actions/ScreenActions';

export default function Screen(props) {
  Component.call(this, props);
}
Object.assign(Screen.prototype, Component.prototype, {
  componentDidMount() {
    // TODO: this component's mounted by the ROM_RECEIVE action, so we need to
    // put it outside that call to dispatch the canvas receive.
    // Maybe canvases should be managed by the emu, and attached in the component on mount instead?
    setTimeout(() => receiveCanvas(findDOMNode(this)));
  },

  componentWillUnmount() {
    clearCanvas();
  },

  render() {
    return (
      <canvas className="screen" />
    );
  },
});
