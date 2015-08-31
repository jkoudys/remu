/**
 * The main gameboy display
 */

import MenuPanel from './MenuPanel.jsx';
import RomLoader from './RomLoader.jsx';
import Screen from './Screen.jsx';

import EmuStore from '../stores/EmuStore.js';

function buildState() {
  return {
    loaded: EmuStore.isRomLoaded()
  };
}

class GameBoy extends React.Component {
  constructor(props) {
    super(props);

    this.state = buildState();
  }

  componentWillMount() {
    EmuStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    EmuStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(buildState());
  }

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
  }
}

export default GameBoy;
