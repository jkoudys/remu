import { Component, CreateElement as ce } from 'react';
import EmuStore from '../stores/EmuStore';
import LogStore from '../stores/LogStore';

import EmulatorLog from './Menu/EmulatorLog.jsx';
import RomInfo from './Menu/RomInfo.jsx';
import SaveStates from './Menu/SaveStates.jsx';
import MenuOpen from './Menu/MenuOpen.jsx';
import Debugger from './Debugger.jsx';

const { assign, create } = Object;

// Time formatter
const _saveStub = [{ time: Date.now() - 1000, id: 123 }];

export default function MenuPanel(props) {
  Component.call(this, props);

  assign(this, {
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
MenuPanel.prototype = assign(create(Component.prototype), {
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
      menuToggle = ce(MenuOpen, { onClick: this._handleOpenMenu });
    }

    if (submenu) {
      back = (
        ce('button', { key: 'back', className: 'back' }, [
          ce('i', { className: 'fa fa-chevron-left' }),
        ]),
      );
    }

    if (romProps) {
      romInfo = ce(RomInfo, romProps);
    }

    return (
      ce('aside', { className: `menupanel ${open ? 'open' : ''}` }, [
        ce('nav', { className: 'controls' }, [
          ce('h1', {}, 'Menu'),
          ce('button', { className: 'close', onClick: this._handleCloseMenu }, [
            ce('i', { className: 'fa fa-times' }),
          ]),
          back,
          menuToggle,
        ]),
        ce('section', {}, [
          ce('section', { className: 'submenus' }, [
            ce('nav', {}, [
              ce('ul', {}, [
                ce('li', {}, [
                  ce('i', { className: 'fa fa-cogs' }),
                  ' Debugger',
                ]),
                ce('li', {}, [
                  ce('i', { className: 'fa fa-picture-o' }),
                  ' Tile Browser',
                ]),
              ]),
            ]),
          ]),
          romInfo,
          ce(Debugger),
          ce(SaveStates, { saves: _saveStub }),
          ce(EmulatorLog, { log }),
        ]),
      ])
    );
  },
});
