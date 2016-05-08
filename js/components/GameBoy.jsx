/**
 * The main gameboy display
 */

import React, { Component } from 'react';

import MenuPanel from './MenuPanel.jsx';
import RomLoader from './RomLoader.jsx';
import Screen from './Screen.jsx';

import EmuStore from '../stores/EmuStore.js';

const buildState = () => ({
  loaded: EmuStore.isRomLoaded(),
});

export default function GameBoy(props) {
  Component.call(this, props);

  Object.assign(this, {
    state: buildState(),
    _onChange: () => this.setState(buildState()),
  });
}
Object.assign(GameBoy.prototype, Component.prototype, {
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
