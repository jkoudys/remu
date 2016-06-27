/**
 * The main gameboy display
 */

import { Component, CreateElement as ce } from 'react';

import MenuPanel from './MenuPanel.jsx';
import RomLoader from './RomLoader.jsx';
import Screen from './Screen.jsx';

import EmuStore from '../stores/EmuStore.js';

const { assign, create } = Object;

const buildState = () => ({
  loaded: EmuStore.isRomLoaded(),
});

export default function GameBoy(props) {
  Component.call(this, props);

  assign(this, {
    state: buildState(),
    _onChange: () => this.setState(buildState()),
  });
}
GameBoy.prototype = assign(create(Component.prototype), {
  componentWillMount() {
    EmuStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    EmuStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      ce('section', { id: 'gameboy' }, [
        ce(this.state.loaded ? Screen : RomLoader),
        ce(MenuPanel),
      ])
    );
  },
});
