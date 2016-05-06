import React from 'react';
import { findDOMNode } from 'react-dom';

import * as EmuActions from '../actions/EmuActions.js';

export default function Screen() {}
Object.assign(Screen.prototype, React.Component.prototype, {
  componentDidMount() {
    // Since we currently only support one device at a time, assume the last
    // Screen is the one the device should render to. May never change, as
    // multiple devices should just be multiple browser tabs.
    setTimeout(EmuActions.receiveCanvas.bind(this, findDOMNode(this)), 0);
  },

  render() {
    return (
      <canvas className="screen" />
    );
  },
});
