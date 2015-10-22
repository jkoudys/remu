import EmuStore from '../stores/EmuStore.js';
import LogStore from '../stores/LogStore.js';

// Time formatter
const _fmt = Intl.DateTimeFormat(undefined, {hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric'});

const RomInfo = ({filename, name, size, type}) => (
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

const SaveStates = ({saves}) => (
  <section id="savestates">
    <h3>
      <i className="fa fa-database" /> Save Games
    </h3>
    <ul>
      {saves.map(save => <li key={save.time}>><a className="loadsave">{_fmt.format(save.time)}</a></li>)}
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

const EmulatorLog = ({log}) => (
  <section id="emulatorlog">
    <h3>
      <i className="fa fa-list" /> Log
    </h3>
    <table>
      {log.map((entry, i) => (
        <tr key={'entry' + i}>
          <td>{Math.floor((entry.time - log[0].time) / 1000) + 's'}</td>
          <td>{entry.component}</td>
          <td>{entry.msg}</td>
        </tr>
      ))}
    </table>
  </section>
);

export default class MenuPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      open: (document.body.offsetWidth > 1400),
      submenu: null,
      log: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  handleOpen() {
    this.setState({open: true});
  }

  componentWillMount() {
    EmuStore.addChangeListener(this._onEmuChange.bind(this));
    LogStore.addChangeListener(this._onLogChange.bind(this));
  }

  componentWillUnmount() {
    EmuStore.removeChangeListener(this._onEmuChange);
    LogStore.removeChangeListener(this._onLogChange);
  }

  _onEmuChange() {
    this.setState({
      romProps: EmuStore.getRomInfo()
    });
  }

  _onLogChange() {
    this.setState({
      log: LogStore.getLog()
    });
  }

  render() {
    let menuToggle;
    let back;
    let romInfo;

    if (!this.state.open) {
      menuToggle = <button key="menutoggle" className="menutoggle" onClick={this.handleOpen}><i className="fa fa-chevron-left" /> menu</button>;
    }

    if (this.state.submenu) {
      back = <button key="back" className="back"><i className="fa fa-chevron-left" /></button>
    }

    if (this.state.romProps) {
      romInfo = <RomInfo {...this.state.romProps} />;
    }

    return (
      <aside className={'menupanel' + (this.state.open ? ' open' : '')}>
        <nav className="controls">
          <h1>Menu</h1>
          <button className="close" onClick={this.handleClose}><i className="fa fa-times" /></button>
          {back}
          {menuToggle}
        </nav>
        <section>
          <section className="submenus">
            <nav>
              <ul>
                <li><i className="fa fa-cogs" /> Debugger</li>
                <li><i className="fa fa-picture-o" /> Tile Browser</li>
              </ul>
            </nav>
          </section>
          {romInfo}
          <SaveStates saves={[{time: Date.now() - 1000, id: 123}]} />
          <EmulatorLog log={this.state.log} />
        </section>
      </aside>
    );
  }
}
