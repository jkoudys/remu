import React from 'react';
import EmuStore from '../stores/EmuStore.js';
import LogStore from '../stores/LogStore.js';

// Time formatter
const _fmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric' });
const _saveStub = [{ time: Date.now() - 1000, id: 123 }];

const RomInfo = ({ filename, name, size, type, systems }) => (
  <section id="rominfo">
    <h3>
      <i className="fa fa-table" /> {name || filename}
    </h3>
    <dl>
      <dt>Filename</dt>
      <dd>{filename}</dd>
      <dt>Size</dt>
      <dd>{(size >> 10) + ' KiB'}</dd>
      <dt>Supported Systems</dt>
      <dd>{systems.join(', ')}</dd>
      <dt>Type</dt>
      <dd>{type}</dd>
    </dl>
  </section>
);

const SaveStates = ({ saves }) => (
  <section id="savestates">
    <h3>
      <i className="fa fa-database" /> Save Games
    </h3>
    <ul>
      {saves.map(({ time }) => <li key={time}>><a className="loadsave">{_fmt.format(time)}</a></li>)}
      <li>
        <a className="newsave">Save New State</a>
      </li>
    </ul>
    <fieldset>
      <button title="Download battery save">
        <i className="fa fa-download" />
      </button>
      <button title="Upload battery save">
        <i className="fa fa-upload" />
      </button>
    </fieldset>
  </section>
);

const EmulatorLog = ({ log }) => (
  <section id="emulatorlog">
    <h3>
      <i className="fa fa-list" /> Log
    </h3>
    <table>
      <tbody>
        {log.map(({ time, component, msg }, i) => (
          <tr key={'entry' + i}>
            <td>{Math.floor((time - log[0].time) / 1000) + 's'}</td>
            <td>{component}</td>
            <td>{msg}</td>
          </tr>
          ))}
      </tbody>
    </table>
  </section>
);

const MenuOpen = ({ onClick }) => (
  <button key="menutoggle" className="menutoggle" onClick={onClick}>
    <i className="fa fa-chevron-left" /> menu
  </button>
);

export default function MenuPanel(props) {
  React.Componenet.call(this, props);
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
Object.assign(MenuPanel.prototype, new React.Component(), {
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
          <SaveStates saves={_saveStub} />
          <EmulatorLog log={log} />
        </section>
      </aside>
    );
  },
});
