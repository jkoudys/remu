import React from 'react';

import * as EmuActions from '../actions/EmuActions.js';

export default class Screen extends React.Component {
  componentDidMount() {
    // Since we currently only support one device at a time, assume the last
    // Screen is the one the device should render to. May never change, as
    // multiple devices should just be multiple browser tabs.
    setTimeout(EmuActions.receiveCanvas.bind(this, React.findDOMNode(this)), 0);
  }

  render() {
    return (
      <canvas className="screen" />
    );
  }
}
