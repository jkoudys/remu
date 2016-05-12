import React, { Component } from 'react';
import EmuStore from '../stores/EmuStore';
import LogStore from '../stores/LogStore';

import EmulatorLog from './Menu/EmulatorLog.jsx';
import RomInfo from './Menu/RomInfo.jsx';
import SaveStates from './Menu/SaveStates.jsx';
import MenuOpen from './Menu/MenuOpen.jsx';
import Debugger from './Debugger.jsx';

// Time formatter
const _saveStub = [{ time: Date.now() - 1000, id: 123 }];

export default function MenuPanel(props) {
  Component.call(this, props);

  Object.assign(this, {
    state: {
      open: (document.body.offsetWidth > 1400),
      submenu: null,
      log: [],
    },
    _onEmuChange: () => this.setState({ romProps: EmuStore.getRomInfo() }),
    _onLogChange: () => this.setState({ log: LogStore.getLog() }),
    _handleOpenMenu: () => this.setState({ open: true }),
    _handleCloseMenu: () => this.setState({ open: false }),
  });
}
MenuPanel.prototype = Object.assign(Object.create(Component.prototype), {
  componentWillMount() {
    EmuStore.addChangeListener(this._onEmuChange);
    LogStore.addChangeListener(this._onLogChange);
  },

  componentWillUnmount() {
    EmuStore.removeChangeListener(this._onEmuChange);
    LogStore.removeChangeListener(this._onLogChange);
  },

  render() {
    const { open, submenu, romProps, log } = this.state;
    let menuToggle;
    let back;
    let romInfo;

    if (!open) {
      menuToggle = <MenuOpen onClick={this._handleOpenMenu} />;
    }

    if (submenu) {
      back = (
        <button key="back" className="back">
          <i className="fa fa-chevron-left" />
        </button>
      );
    }

    if (romProps) {
      romInfo = <RomInfo {...romProps} />;
    }

    return (
      <aside className={`menupanel ${open ? 'open' : ''}`}>
        <nav className="controls">
          <h1>Menu</h1>
          <button className="close" onClick={this._handleCloseMenu}>
            <i className="fa fa-times" />
          </button>
          {back}
          {menuToggle}
        </nav>
        <section>
          <section className="submenus">
            <nav>
              <ul>
                <li>
                  <i className="fa fa-cogs" /> Debugger
                </li>
                <li>
                  <i className="fa fa-picture-o" /> Tile Browser
                </li>
              </ul>
            </nav>
          </section>
          {romInfo}
          <Debugger />
          <SaveStates saves={_saveStub} />
          <EmulatorLog log={log} />
        </section>
      </aside>
    );
  },
});
