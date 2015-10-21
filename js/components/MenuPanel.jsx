import EmuStore from '../stores/EmuStore.js';
import LogStore from '../stores/LogStore.js';

// Time formatter
const _fmt = Intl.DateTimeFormat(undefined, {hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric'});

class RomInfo extends React.Component {
  render() {
    return (
      <section id="rominfo">
        <h3><i className="fa fa-table" /> {this.props.name || this.props.filename}</h3>
        <dl>
          <dt>Filename</dt>
          <dd>{this.props.filename}</dd>
          <dt>Size</dt>
          <dd>{(this.props.size >> 10) + ' KiB'}</dd>
          <dt>Supported Systems</dt>
          <dd>{this.props.systems.join(', ')}</dd>
          <dt>Type</dt>
          <dd>{this.props.type}</dd>
        </dl>
      </section>
    );
  }
}

class SaveStates extends React.Component {
  render() {
    // TODO: get array from localStorage
    // We'll use the state.id to get its cache key
    var states = [
      {time: Date.now() - 1000, id: 123}
    ];

    return (
      <section id="savestates">
        <h3><i className="fa fa-database" /> Save Games</h3>
        <ul>
          {states.map(function(state) {
            return <li key={state.time}>><a className="loadstate">{_fmt.format(state.time)}</a></li>;
          })}
          <li><a className="newstate">Save New State</a></li>
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
  }
}

class EmulatorLog extends React.Component {
  constructor() {
    super();
    this.state = {startTime: Date.now()};
  }

  render() {
    return (
      <section id="emulatorlog">
        <h3><i className="fa fa-list" /> Log</h3>
        <table>
          {this.props.log.map((entry, i) =>
              <tr key={'entry' + i}>
                <td>{Math.floor((entry.time - this.state.startTime) / 1000) + 's'}</td>
                <td>{entry.component}</td>
                <td>{entry.msg}</td>
              </tr>
          )}
        </table>
      </section>
    );
  }
}

class MenuPanel extends React.Component {
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
    var menuToggle;
    var back;
    var romInfo;

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
          <SaveStates />
          <EmulatorLog log={this.state.log} />
        </section>
      </aside>
    );
  }
}

export default MenuPanel;
