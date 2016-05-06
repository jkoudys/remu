/**
 * The main gameboy display
 */

import React from 'react';

import MenuPanel from './MenuPanel.jsx';
import RomLoader from './RomLoader.jsx';
import Screen from './Screen.jsx';

import EmuStore from '../stores/EmuStore.js';

function buildState() {
  return {
    loaded: EmuStore.isRomLoaded()
  };
}

export default function GameBoy(props) {
  React.Component.call(this, props);

  Object.assign(this, {
    state: buildState(),
    _onChange: () => this.setState(buildState()),
  });
}
GameBoy.prototype = Object.assign(Object.create(React.Component), {
  componentWillMount() {
    EmuStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    EmuStore.removeChangeListener(this._onChange);
  },

  render() {
    let screen;
    if (this.state.loaded) {
      screen = <Screen key="screen" />;
    } else {
      screen = <RomLoader key="romloader" />;
    }

    return (
      <section id="gameboy">
        {screen}
        <MenuPanel />
      </section>
    );
  },
});
