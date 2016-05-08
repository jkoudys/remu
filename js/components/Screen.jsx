import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { receiveCanvas } from '../actions/EmuActions.js';

export default function Screen(props) {
  Component.call(this, props);
}
Object.assign(Screen.prototype, Component.prototype, {
  componentDidMount() {
    // Since we currently only support one device at a time, assume the last
    // Screen is the one the device should render to. May never change, as
    // multiple devices should just be multiple browser tabs.
    setTimeout(() => receiveCanvas(findDOMNode(this)), 0);
  },

  render() {
    return (
      <canvas className="screen" />
    );
  },
});
