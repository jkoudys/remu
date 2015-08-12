(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.pause = pause;
exports.reset = reset;
exports.refreshFps = refreshFps;
exports.receiveRom = receiveRom;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsEmuConstantsJs = require('../constants/EmuConstants.js');

var _dispatcherAppDispatcherJs = require('../dispatcher/AppDispatcher.js');

var _dispatcherAppDispatcherJs2 = _interopRequireDefault(_dispatcherAppDispatcherJs);

function pause() {
  _dispatcherAppDispatcherJs2['default'].dispatch({
    type: _constantsEmuConstantsJs.ActionTypes.EMU_PAUSE
  });
}

function reset() {
  _dispatcherAppDispatcherJs2['default'].dispatch({
    type: _constantsEmuConstantsJs.ActionTypes.EMU_RESET
  });
}

function refreshFps(fps) {
  _dispatcherAppDispatcherJs2['default'].dispatch({
    type: _constantsEmuConstantsJs.ActionTypes.FPS_REFRESH,
    fps: fps
  });
}

/**
 * Receives binary ROM data
 * @param arraybuffer rom Binary buffer of the ROM
 * @param string filename Optional filename of the ROM
 */

function receiveRom(rom, filename) {
  _dispatcherAppDispatcherJs2['default'].dispatch({
    type: _constantsEmuConstantsJs.ActionTypes.ROM_RECEIVE,
    rom: rom,
    filename: filename
  });
}

},{"../constants/EmuConstants.js":7,"../dispatcher/AppDispatcher.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.log = log;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsEmuConstantsJs = require('../constants/EmuConstants.js');

var _dispatcherAppDispatcherJs = require('../dispatcher/AppDispatcher.js');

var _dispatcherAppDispatcherJs2 = _interopRequireDefault(_dispatcherAppDispatcherJs);

var _storesEmuStoreJs = require('../stores/EmuStore.js');

var _storesEmuStoreJs2 = _interopRequireDefault(_storesEmuStoreJs);

/**
 * Add a log entry
 * @param string module
 * @param string msg
 */

function log(component, msg) {
  _dispatcherAppDispatcherJs2['default'].waitFor([_storesEmuStoreJs2['default'].dispatchToken]);
  _dispatcherAppDispatcherJs2['default'].dispatch({
    type: _constantsEmuConstantsJs.ActionTypes.LOG_APPEND,
    component: component,
    msg: msg
  });
}

},{"../constants/EmuConstants.js":7,"../dispatcher/AppDispatcher.js":8,"../stores/EmuStore.js":10}],3:[function(require,module,exports){
/**
 * GameBoy Emulator, main app
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsEmulatorKeypadJs = require('./utils/emulator/Keypad.js');

var _utilsEmulatorKeypadJs2 = _interopRequireDefault(_utilsEmulatorKeypadJs);

var _componentsGameBoyJsx = require('./components/GameBoy.jsx');

var _componentsGameBoyJsx2 = _interopRequireDefault(_componentsGameBoyJsx);

document.addEventListener('DOMContentLoaded', function () {
  React.render(React.createElement(_componentsGameBoyJsx2['default'], null), document.getElementById('reactboy'));

  // Bind keyboard to the GB keypad
  window.onkeydown = _utilsEmulatorKeypadJs2['default'].keydown;
  window.onkeyup = _utilsEmulatorKeypadJs2['default'].keyup;
});

},{"./components/GameBoy.jsx":4,"./utils/emulator/Keypad.js":14}],4:[function(require,module,exports){
/**
 * Thin-class, showing the main components of the Greenbelt Route app
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _MenuPanelJsx = require('./MenuPanel.jsx');

var _MenuPanelJsx2 = _interopRequireDefault(_MenuPanelJsx);

var _RomLoaderJsx = require('./RomLoader.jsx');

var _RomLoaderJsx2 = _interopRequireDefault(_RomLoaderJsx);

var _storesEmuStoreJs = require('../stores/EmuStore.js');

var _storesEmuStoreJs2 = _interopRequireDefault(_storesEmuStoreJs);

var _actionsEmuActionsJs = require('../actions/EmuActions.js');

var EmuActions = _interopRequireWildcard(_actionsEmuActionsJs);

var GameBoy = (function (_React$Component) {
  _inherits(GameBoy, _React$Component);

  function GameBoy(props) {
    _classCallCheck(this, GameBoy);

    _get(Object.getPrototypeOf(GameBoy.prototype), 'constructor', this).call(this);
  }

  _createClass(GameBoy, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _storesEmuStoreJs2['default'].addChangeListener(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesEmuStoreJs2['default'].removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'section',
        { id: 'gameboy' },
        React.createElement(_RomLoaderJsx2['default'], null),
        React.createElement(_MenuPanelJsx2['default'], null)
      );
    }
  }]);

  return GameBoy;
})(React.Component);

exports['default'] = GameBoy;
module.exports = exports['default'];

},{"../actions/EmuActions.js":1,"../stores/EmuStore.js":10,"./MenuPanel.jsx":5,"./RomLoader.jsx":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _storesEmuStoreJs = require('../stores/EmuStore.js');

var _storesEmuStoreJs2 = _interopRequireDefault(_storesEmuStoreJs);

var _storesLogStoreJs = require('../stores/LogStore.js');

var _storesLogStoreJs2 = _interopRequireDefault(_storesLogStoreJs);

// Time formatter
var _fmt = Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric' });

var RomInfo = (function (_React$Component) {
  _inherits(RomInfo, _React$Component);

  function RomInfo() {
    _classCallCheck(this, RomInfo);

    _get(Object.getPrototypeOf(RomInfo.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(RomInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'section',
        { id: 'rominfo' },
        React.createElement(
          'h3',
          null,
          React.createElement('i', { className: 'fa fa-table' }),
          ' ',
          this.props.name || this.props.filename
        ),
        React.createElement(
          'dl',
          null,
          React.createElement(
            'dt',
            null,
            'Filename'
          ),
          React.createElement(
            'dd',
            null,
            this.props.filename
          ),
          React.createElement(
            'dt',
            null,
            'Size'
          ),
          React.createElement(
            'dd',
            null,
            (this.props.size >> 10) + ' KiB'
          ),
          React.createElement(
            'dt',
            null,
            'Supported Systems'
          ),
          React.createElement(
            'dd',
            null,
            this.props.systems.join(', ')
          ),
          React.createElement(
            'dt',
            null,
            'Type'
          ),
          React.createElement(
            'dd',
            null,
            this.props.type
          )
        )
      );
    }
  }]);

  return RomInfo;
})(React.Component);

var SaveStates = (function (_React$Component2) {
  _inherits(SaveStates, _React$Component2);

  function SaveStates() {
    _classCallCheck(this, SaveStates);

    _get(Object.getPrototypeOf(SaveStates.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SaveStates, [{
    key: 'render',
    value: function render() {
      // TODO: get array from localStorage
      // We'll use the state.id to get its cache key
      var states = [{ time: Date.now() - 1000, id: 123 }];

      return React.createElement(
        'section',
        { id: 'savestates' },
        React.createElement(
          'h3',
          null,
          React.createElement('i', { className: 'fa fa-database' }),
          ' Save Games'
        ),
        React.createElement(
          'ul',
          null,
          states.map(function (state) {
            return React.createElement(
              'li',
              { key: state.time },
              '>',
              React.createElement(
                'a',
                { className: 'loadstate' },
                _fmt.format(state.time)
              )
            );
          }),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { className: 'newstate' },
              'Save New State'
            )
          )
        ),
        React.createElement(
          'fieldset',
          null,
          React.createElement(
            'button',
            { title: 'Download battery save' },
            React.createElement('i', { className: 'fa fa-download' })
          ),
          React.createElement(
            'button',
            { title: 'Upload battery save' },
            React.createElement('i', { className: 'fa fa-upload' })
          )
        )
      );
    }
  }]);

  return SaveStates;
})(React.Component);

var EmulatorLog = (function (_React$Component3) {
  _inherits(EmulatorLog, _React$Component3);

  function EmulatorLog() {
    _classCallCheck(this, EmulatorLog);

    _get(Object.getPrototypeOf(EmulatorLog.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(EmulatorLog, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'section',
        { id: 'emulatorlog' },
        React.createElement(
          'h3',
          null,
          React.createElement('i', { className: 'fa fa-list' }),
          ' Log'
        ),
        React.createElement(
          'table',
          null,
          this.props.log.map(function (entry) {
            return React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                entry.time + 'ms'
              ),
              React.createElement(
                'td',
                null,
                entry.message
              )
            );
          })
        )
      );
    }
  }]);

  return EmulatorLog;
})(React.Component);

var MenuPanel = (function (_React$Component4) {
  _inherits(MenuPanel, _React$Component4);

  function MenuPanel() {
    _classCallCheck(this, MenuPanel);

    _get(Object.getPrototypeOf(MenuPanel.prototype), 'constructor', this).call(this);
    this.state = { open: document.body.offsetWidth > 1400, submenu: null };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  _createClass(MenuPanel, [{
    key: 'handleClose',
    value: function handleClose() {
      this.setState({ open: false });
    }
  }, {
    key: 'handleOpen',
    value: function handleOpen() {
      this.setState({ open: true });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _storesEmuStoreJs2['default'].addChangeListener(this._onChange.bind(this));
      _storesLogStoreJs2['default'].addChangeListener(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesEmuStoreJs2['default'].removeChangeListener(this._onChange);
      _storesLogStoreJs2['default'].removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({});
    }
  }, {
    key: 'render',
    value: function render() {
      var menuToggle;
      var back;
      var romInfo;
      var romProps = _storesEmuStoreJs2['default'].getRomInfo();

      if (!this.state.open) {
        menuToggle = React.createElement(
          'button',
          { key: 'menutoggle', className: 'menutoggle', onClick: this.handleOpen },
          React.createElement('i', { className: 'fa fa-chevron-left' }),
          ' menu'
        );
      }

      if (this.state.submenu) {
        back = React.createElement(
          'button',
          { key: 'back', className: 'back' },
          React.createElement('i', { className: 'fa fa-chevron-left' })
        );
      }

      if (romProps) {
        romInfo = React.createElement(RomInfo, romProps);
      }

      return React.createElement(
        'aside',
        { className: 'menupanel' + (this.state.open ? ' open' : '') },
        React.createElement(
          'nav',
          { className: 'controls' },
          React.createElement(
            'h1',
            null,
            'Menu'
          ),
          React.createElement(
            'button',
            { className: 'close', onClick: this.handleClose },
            React.createElement('i', { className: 'fa fa-times' })
          ),
          back,
          menuToggle
        ),
        React.createElement(
          'section',
          null,
          React.createElement(
            'section',
            { className: 'submenus' },
            React.createElement(
              'nav',
              null,
              React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  null,
                  React.createElement('i', { className: 'fa fa-cogs' }),
                  ' Debugger'
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement('i', { className: 'fa fa-picture-o' }),
                  ' Tile Browser'
                )
              )
            )
          ),
          romInfo,
          React.createElement(SaveStates, null),
          React.createElement(EmulatorLog, { log: _storesLogStoreJs2['default'].getLog() })
        )
      );
    }
  }]);

  return MenuPanel;
})(React.Component);

exports['default'] = MenuPanel;
module.exports = exports['default'];

},{"../stores/EmuStore.js":10,"../stores/LogStore.js":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actionsEmuActionsJs = require('../actions/EmuActions.js');

var EmuActions = _interopRequireWildcard(_actionsEmuActionsJs);

var RomLoader = (function (_React$Component) {
  _inherits(RomLoader, _React$Component);

  function RomLoader() {
    _classCallCheck(this, RomLoader);

    _get(Object.getPrototypeOf(RomLoader.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(RomLoader, [{
    key: 'handleLoadFile',
    value: function handleLoadFile(ev) {
      var file = ev.target.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        EmuActions.receiveRom(this.result, file.name);
      };

      reader.readAsArrayBuffer(file);
    }
  }, {
    key: 'handleLoadUrl',
    value: function handleLoadUrl(url) {
      var xhr = new XMLHttpRequest();
      url = '/tests/tetris.gb';
      xhr.open('GET', url);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        EmuActions.receiveRom(this.response, url.substring(url.lastIndexOf('/') + 1));
      };

      xhr.send();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'section',
        { className: 'romloader' },
        React.createElement(
          'fieldset',
          null,
          React.createElement(
            'div',
            null,
            React.createElement(
              'input',
              { type: 'file', onChange: this.handleLoadFile },
              React.createElement('i', { className: 'fa fa-folder-open-o' }),
              ' Open a File'
            )
          ),
          React.createElement(
            'div',
            { onClick: this.handleLoadUrl },
            React.createElement('i', { className: 'fa fa-globe' }),
            ' Open a URL'
          )
        )
      );
    }
  }]);

  return RomLoader;
})(React.Component);

exports['default'] = RomLoader;
module.exports = exports['default'];

},{"../actions/EmuActions.js":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var ActionTypes = (function () {
  var actions = {};
  ['ROM_RECEIVE', 'EMU_RESET', 'EMU_PAUSE', 'EMU_RUN', 'FPS_RECEIVE', 'LOG_APPEND'].forEach(function (val) {
    actions[val] = val;
  });
  return actions;
})();
exports.ActionTypes = ActionTypes;

},{}],8:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();

},{"flux":20}],9:[function(require,module,exports){
// Object.assign
'use strict';

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

// Array.prototype.includes
[].includes || (Array.prototype.includes = function (a) {
  'use strict';var b = Object(this),
      c = parseInt(b.length) || 0;if (0 === c) return !1;var e,
      d = parseInt(arguments[1]) || 0;d >= 0 ? e = d : (e = c + d, 0 > e && (e = 0));for (var f; c > e;) {
    if ((f = b[e], a === f || a !== a && f !== f)) return !0;e++;
  }return !1;
});

},{}],10:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

var _dispatcherAppDispatcherJs = require('../dispatcher/AppDispatcher.js');

var _dispatcherAppDispatcherJs2 = _interopRequireDefault(_dispatcherAppDispatcherJs);

var _constantsEmuConstantsJs = require('../constants/EmuConstants.js');

// z80 emu

var _utilsEmulatorGpuJs = require('../utils/emulator/gpu.js');

var _utilsEmulatorGpuJs2 = _interopRequireDefault(_utilsEmulatorGpuJs);

var _utilsEmulatorMmuJs = require('../utils/emulator/mmu.js');

var _utilsEmulatorMmuJs2 = _interopRequireDefault(_utilsEmulatorMmuJs);

var _utilsEmulatorKeypadJs = require('../utils/emulator/Keypad.js');

var _utilsEmulatorKeypadJs2 = _interopRequireDefault(_utilsEmulatorKeypadJs);

var _utilsEmulatorTimerJs = require('../utils/emulator/Timer.js');

var _utilsEmulatorTimerJs2 = _interopRequireDefault(_utilsEmulatorTimerJs);

var _utilsEmulatorZ80Js = require('../utils/emulator/z80.js');

var _utilsEmulatorZ80Js2 = _interopRequireDefault(_utilsEmulatorZ80Js);

// Helpers

var _utilsEmuHelperJs = require('../utils/EmuHelper.js');

var eh = _interopRequireWildcard(_utilsEmuHelperJs);

// Basic event name for basic emulator state change
var CHANGE_EVENT = 'change';

/**
 * Local variables to the store
 */
var _romFileName = '';
var _frameCounter = { start: 0, frames: 0 };

/**
 * @param int _fps Target fps - no need for this to be higher than what you can see
 * TODO: make this configurable, and potentially auto-set from WebGL-reported
 * framerate.
 */
var _fps = 60;

/**
 * setInterval IDs for polling processes
 * @param int _runInterval The interval of the actively running emulator
 * @param int _frameInterval The interval we poll to count FPS
 */
var _runInterval;
var _frameInterval;

/**
 * Pause all execution. Pause issued from emulator controls, not in-game
 */
function pauseEmulation() {
  window.clearInterval(_runInterval);
  window.clearInterval(_frameInterval);
  _utilsEmulatorZ80Js2['default']._stop = 1;
}

/**
 * Reset the emulator. A hard reset, equivalent to hitting power off/on
 */
function resetEmulation() {
  _utilsEmulatorGpuJs2['default'].reset();
  _utilsEmulatorMmuJs2['default'].reset();
  _utilsEmulatorZ80Js2['default'].reset();
  _utilsEmulatorKeypadJs2['default'].reset();
  _utilsEmulatorTimerJs2['default'].reset();
  _utilsEmulatorMmuJs2['default']._inbios = 0;

  pauseEmulation();
}

/**
 * Start the emulator up!
 */
function runEmulation() {
  // Clear the 'stopped' status'
  _utilsEmulatorZ80Js2['default']._stop = 0;

  // Start running - we run as many cycles as the GB would normally in that time
  // Intervals' are in ms, so (1000 ms/s) / (60 frames/s) tells us how many ms
  // to run per frame.
  _runInterval = window.setInterval(executeFrame, 1000 / _fps);

  // Poll to see how many frames we've rendered
  _frameCounter.start = Date.now();
  _frameCounter.frames = 0;
  _frameInterval = window.setInterval(function () {
    var now = Date.now();
    document.getElementById('fps').textContent = _frameCounter.frames / (now - _frameCounter.start) << 0;
    _frameCounter.start = now;
    _frameCounter.frames = 0;
  }, 2000);
}

/**
 * Receive the raw ROM data
 * @param ArrayBuffer buffer
 */
function receiveRom(buffer) {
  _utilsEmulatorMmuJs2['default'].load(buffer);
}

/**
 * Refresh our FPS counter
 */
function receiveFps() {}

/**
 * Execute a single 'frame' (one update of the actual screen, not the GB)
 */
function executeFrame() {
  // A separate 'frame clock', so we can run multiple z80 cycles per
  // frame we update to the canvas. Calculated as the number of GB cycles to
  // run between each emulator screen update.
  // (frames/s) / (clock speed in Hz) => GB clock ticks to run
  var fclock = _utilsEmulatorZ80Js2['default'].speed / _fps;
  var clockTicks = 0;
  var opTicks = 0;
  do {
    if (_utilsEmulatorZ80Js2['default']._halt) {
      opTicks = 1;
    } else {
      opTicks = _utilsEmulatorZ80Js2['default'].exec();
    }
    if (_utilsEmulatorZ80Js2['default'].isInterruptable() && _utilsEmulatorMmuJs2['default']._ie && _utilsEmulatorMmuJs2['default']._if) {
      _utilsEmulatorZ80Js2['default']._halt = false;
      _utilsEmulatorZ80Js2['default'].disableInterrupts();
      var ifired = _utilsEmulatorMmuJs2['default']._ie & _utilsEmulatorMmuJs2['default']._if;
      if (ifired & 0x01) {
        _utilsEmulatorMmuJs2['default']._if &= 0xFE;
        _utilsEmulatorZ80Js2['default']._ops.RST40();
      } else if (ifired & 0x02) {
        _utilsEmulatorMmuJs2['default']._if &= 0xFD;
        _utilsEmulatorZ80Js2['default']._ops.RST48();
      } else if (ifired & 0x04) {
        _utilsEmulatorMmuJs2['default']._if &= 0xFB;
        _utilsEmulatorZ80Js2['default']._ops.RST50();
      } else if (ifired & 0x08) {
        _utilsEmulatorMmuJs2['default']._if &= 0xF7;
        _utilsEmulatorZ80Js2['default']._ops.RST58();
      } else if (ifired & 0x10) {
        _utilsEmulatorMmuJs2['default']._if &= 0xEF;
        _utilsEmulatorZ80Js2['default']._ops.RST60();
      } else {
        _utilsEmulatorZ80Js2['default'].enableInterrupts();
      }
    }
    clockTicks += opTicks;
    _utilsEmulatorGpuJs2['default'].checkline(opTicks);
    _utilsEmulatorTimerJs2['default'].inc(opTicks);
    if (_utilsEmulatorZ80Js2['default']._stop) {
      pauseEmulation();
      break;
    }
    // Run until we need to update the screen again
  } while (clockTicks < fclock);

  // fclock divided into 1000 frame segments
  _frameCounter.frames += fclock;
}

var EmuStore = Object.assign({}, _events.EventEmitter.prototype, {
  /**
   * @param {function} callback
   */
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Get the basic info on this ROM
   * @return object Paremeters of ROM metadata, e.g. name, size, etc.
   */
  getRomInfo: function getRomInfo() {
    if (_utilsEmulatorMmuJs2['default']._rom) {
      return {
        name: eh.stringify(_utilsEmulatorMmuJs2['default']._rom.subarray(0x0134, 0x0144)),
        systems: eh.supportedSystems(_utilsEmulatorMmuJs2['default']._rom),
        type: eh.type(_utilsEmulatorMmuJs2['default']._rom),
        filename: _romFileName,
        size: _utilsEmulatorMmuJs2['default']._rom.length
      };
    } else {
      return null;
    }
  },

  /**
   * Get the current state of the registers
   * @return object Registers
   */
  getRegisters: function getRegisters() {
    return _utilsEmulatorZ80Js2['default'].getRegisters();
  }
});

EmuStore.dispatchToken = _dispatcherAppDispatcherJs2['default'].register(function (payload) {
  switch (payload.type) {
    case _constantsEmuConstantsJs.ActionTypes.ROM_RECEIVE:
      receiveRom(payload.rom);
      _romFileName = payload.filename;
      EmuStore.emitChange();
      break;
    case _constantsEmuConstantsJs.ActionTypes.EMU_RESET:
      resetEmulation();
      EmuStore.emitChange();
      break;
    case _constantsEmuConstantsJs.ActionTypes.EMU_PAUSE:
      pauseEmulation();
      EmuStore.emitChange();
      break;
    case _constantsEmuConstantsJs.ActionTypes.EMU_RUN:
      runEmulation();
      EmuStore.emitChange();
      break;
    case _constantsEmuConstantsJs.ActionTypes.FPS_RECEIVE:
      EmuStore.emitChange();
      break;
  }
});

exports['default'] = EmuStore;
module.exports = exports['default'];

},{"../constants/EmuConstants.js":7,"../dispatcher/AppDispatcher.js":8,"../utils/EmuHelper.js":12,"../utils/emulator/Keypad.js":14,"../utils/emulator/Timer.js":15,"../utils/emulator/gpu.js":16,"../utils/emulator/mmu.js":17,"../utils/emulator/z80.js":18,"events":19}],11:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

var _dispatcherAppDispatcherJs = require('../dispatcher/AppDispatcher.js');

var _dispatcherAppDispatcherJs2 = _interopRequireDefault(_dispatcherAppDispatcherJs);

var _constantsEmuConstantsJs = require('../constants/EmuConstants.js');

var _EmuStoreJs = require('./EmuStore.js');

var _EmuStoreJs2 = _interopRequireDefault(_EmuStoreJs);

// Basic event name for basic emulator state change
var CHANGE_EVENT = 'change';

/**
 * Local variables to the store
 */
var _log = [];

/**
 * Add to the runtime log
 * @param string msg The message to save
 * @param string component Optional module name that set the message
 */
function appendtoLog(msg, component) {
  var entry = { time: Date.now(), name: component, msg: msg };
  _log.push(entry);
  console.log(entry);
}

var LogStore = Object.assign({}, _events.EventEmitter.prototype, {
  /**
   * @param {function} callback
   */
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Gets the runtime log
   * @return array<object>
   */
  getLog: function getLog() {
    return _log;
  }
});

LogStore.dispatchToken = _dispatcherAppDispatcherJs2['default'].register(function (payload) {
  switch (payload.type) {
    case _constantsEmuConstantsJs.ActionTypes.LOG_APPEND:
      // Log our messages once we're finished dispatching the Emulator
      _dispatcherAppDispatcherJs2['default'].waitFor([_EmuStoreJs2['default'].dispatchToken]);

      appendToLog(payload.msg, payload.component);
      LogStore.emitChange();
      break;
  }
});

exports['default'] = LogStore;
module.exports = exports['default'];

},{"../constants/EmuConstants.js":7,"../dispatcher/AppDispatcher.js":8,"./EmuStore.js":10,"events":19}],12:[function(require,module,exports){
/**
 * Look for a null-terminated string over a memory extent
 * @param arraylike array The array/TypedArray to iterate through
 * @return string
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.stringify = stringify;
exports.supportedSystems = supportedSystems;
exports.type = type;

function stringify(array) {
  var retStr = '';

  for (var i = 0, len = array.length; i < len && array[i] !== 0; i++) {
    retStr += String.fromCharCode(array[i]);
  }

  return retStr;
}

/**
 * Check what platforms this rom supports - game boy, gameboy colour, super game boy.
 * We give an array back, so the frontend code can decide how to show it.
 * @param Uint8Array rom The full ROM
 * @return array<string> Set of supported platforms
 */

function supportedSystems(rom) {
  var supported = [];

  // First check the GB/GBC flag
  switch (rom[0x0143]) {
    case 0x00:
      // Game Boy only
      supported.push('GB');
      break;
    case 0x80:
      // Game Boy and GameBoy Color
      supported.push('GB', 'GBC');
      break;
    case 0xC0:
      // GameBoy Color only
      supported.push('GBC');
      break;
  }

  // Super Game Boy is a separate flag, so check next
  if (rom[0x0146] === 0x03) {
    supported.push('SGB');
  }

  return supported;
}

/**
 * Find the 'rom type', ie rom/ram/battery pack support
 * @param Uint8Array rom The ROM
 * @return string The ROM type
 */

function type(rom) {
  switch (rom[0x0147]) {
    case 0x00:
      return 'ROM ONLY';
      break;
    case 0x01:
      return 'MBC1';
      break;
    case 0x02:
      return 'MBC1 RAM';
      break;
    case 0x03:
      return 'MBC1 RAM BATTERY';
      break;
    case 0x05:
      return 'MBC2';
      break;
    case 0x06:
      return 'MBC2 BATTERY';
      break;
    case 0x08:
      return 'ROM RAM';
      break;
    case 0x09:
      return 'ROM RAM BATTERY';
      break;
    case 0x0B:
      return 'MMM01';
      break;
    case 0x0C:
      return 'MMM01 RAM';
      break;
    case 0x0D:
      return 'MMM01 RAM BATTERY';
      break;
    case 0x0F:
      return 'MBC3 TIMER BATTERY';
      break;
    case 0x10:
      return 'MBC3 TIMER RAM BATTERY';
      break;
    case 0x11:
      return 'MBC3';
      break;
    case 0x12:
      return 'MBC3 RAM';
      break;
    case 0x13:
      return 'MBC3 RAM BATTERY';
      break;
    case 0x15:
      return 'MBC4';
      break;
    case 0x16:
      return 'MBC4 RAM';
      break;
    case 0x17:
      return 'MBC4 RAM BATTERY';
      break;
    case 0x19:
      return 'MBC5';
      break;
    case 0x1A:
      return 'MBC5 RAM';
      break;
    case 0x1B:
      return 'MBC5 RAM BATTERY';
      break;
    case 0x1C:
      return 'MBC5 RUMBLE';
      break;
    case 0x1D:
      return 'MBC5 RUMBLE RAM';
      break;
    case 0x1E:
      return 'MBC5 RUMBLE RAM BATTERY';
      break;
    case 0xFC:
      return 'POCKET CAMERA';
      break;
    case 0xFD:
      return 'BANDAI TAMA5';
      break;
    case 0xFE:
      return 'HUC3';
      break;
    case 0xFF:
      return 'HUC1 RAM BATTERY';
      break;
  }
}

},{}],13:[function(require,module,exports){
/**
 * Debug functions
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Debug = {
  /**
   * Disassemble an instruction
   * Lets debugging view something closer to what the original source
   * looked like. Not readable by modern standards, but pretty dang nice
   * for 1983.
   * @param int opcode
   * @return string Readable instruction
   */
  disAsm: function disAsm(opcode) {
    return instructionTable[opcode];
  }
};

var instructionTable = [
// 0x00
'NOP', 'LD BC,nn', 'LD (BC),A', 'INC BC', 'INC B', 'DEC B', 'LD B,n', 'RLC A', 'LD (nn),SP', 'ADD HL,BC', 'LD A,(BC)', 'DEC BC', 'INC C', 'DEC C', 'LD C,n', 'RRC A',
// 1x
'STOP', 'LD DE,nn', 'LD (DE),A', 'INC DE', 'INC D', 'DEC D', 'LD D,n', 'RL A', 'JR n', 'ADD HL,DE', 'LD A,(DE)', 'DEC DE', 'INC E', 'DEC E', 'LD E,n', 'RR A',
// 2x
'JR NZ,n', 'LD HL,nn', 'LDI (HL),A', 'INC HL', 'INC H', 'DEC H', 'LD H,n', 'DAA', 'JR Z,n', 'ADD HL,HL', 'LDI A,(HL)', 'DEC HL', 'INC L', 'DEC L', 'LD L,n', 'CPL',
// 3x
'JR NC,n', 'LD SP,nn', 'LDD (HL),A', 'INC SP', 'INC (HL)', 'DEC (HL)', 'LD (HL),n', 'SCF', 'JR C,n', 'ADD HL,SP', 'LDD A,(HL)', 'DEC SP', 'INC A', 'DEC A', 'LD A,n', 'CCF',
// 4x
'LD B,B', 'LD B,C', 'LD B,D', 'LD B,E', 'LD B,H', 'LD B,L', 'LD B,(HL)', 'LD B,A', 'LD C,B', 'LD C,C', 'LD C,D', 'LD C,E', 'LD C,H', 'LD C,L', 'LD C,(HL)', 'LD C,A',
// 5x
'LD D,B', 'LD D,C', 'LD D,D', 'LD D,E', 'LD D,H', 'LD D,L', 'LD D,(HL)', 'LD D,A', 'LD E,B', 'LD E,C', 'LD E,D', 'LD E,E', 'LD E,H', 'LD E,L', 'LD E,(HL)', 'LD E,A',
// 6x
'LD H,B', 'LD H,C', 'LD H,D', 'LD H,E', 'LD H,H', 'LD H,L', 'LD H,(HL)', 'LD H,A', 'LD L,B', 'LD L,C', 'LD L,D', 'LD L,E', 'LD L,H', 'LD L,L', 'LD L,(HL)', 'LD L,A',
// 7x
'LD (HL),B', 'LD (HL),C', 'LD (HL),D', 'LD (HL),E', 'LD (HL),H', 'LD (HL),L', 'HALT', 'LD (HL),A', 'LD A,B', 'LD A,C', 'LD A,D', 'LD A,E', 'LD A,H', 'LD A,L', 'LD A,(HL)', 'LD A,A',
// 8x
'ADD A,B', 'ADD A,C', 'ADD A,D', 'ADD A,E', 'ADD A,H', 'ADD A,L', 'ADD A,(HL)', 'ADD A,A', 'ADC A,B', 'ADC A,C', 'ADC A,D', 'ADC A,E', 'ADC A,H', 'ADC A,L', 'ADC A,(HL)', 'ADC A,A',
// 9x
'SUB A,B', 'SUB A,C', 'SUB A,D', 'SUB A,E', 'SUB A,H', 'SUB A,L', 'SUB A,(HL)', 'SUB A,A', 'SBC A,B', 'SBC A,C', 'SBC A,D', 'SBC A,E', 'SBC A,H', 'SBC A,L', 'SBC A,(HL)', 'SBC A,A',
// Ax
'AND B', 'AND C', 'AND D', 'AND E', 'AND H', 'AND L', 'AND (HL)', 'AND A', 'XOR B', 'XOR C', 'XOR D', 'XOR E', 'XOR H', 'XOR L', 'XOR (HL)', 'XOR A',
// Bx
'OR B', 'OR C', 'OR D', 'OR E', 'OR H', 'OR L', 'OR (HL)', 'OR A', 'CP B', 'CP C', 'CP D', 'CP E', 'CP H', 'CP L', 'CP (HL)', 'CP A',
// Cx
'RET NZ', 'POP BC', 'JP NZ,nn', 'JP nn', 'CALL NZ,nn', 'PUSH BC', 'ADD A,n', 'RST 0', 'RET Z', 'RET', 'JP Z,nn', 'Ext ops', 'CALL Z,nn', 'CALL nn', 'ADC A,n', 'RST 8',
// Dx
'RET NC', 'POP DE', 'JP NC,nn', 'XX', 'CALL NC,nn', 'PUSH DE', 'SUB A,n', 'RST 10', 'RET C', 'RETI', 'JP C,nn', 'XX', 'CALL C,nn', 'XX', 'SBC A,n', 'RST 18',
// Ex
'LDH (n),A', 'POP HL', 'LDH (C),A', 'XX', 'XX', 'PUSH HL', 'AND n', 'RST 20', 'ADD SP,d', 'JP (HL)', 'LD (nn),A', 'XX', 'XX', 'XX', 'XOR n', 'RST 28',
// Fx
'LDH A,(n)', 'POP AF', 'XX', 'DI', 'XX', 'PUSH AF', 'OR n', 'RST 30', 'LDHL SP,d', 'LD SP,HL', 'LD A,(nn)', 'EI', 'XX', 'XX', 'CP n', 'RST 38'];

exports['default'] = Debug;
module.exports = exports['default'];

},{}],14:[function(require,module,exports){
// Bind our logger
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _actionsLogActionsJs = require('../../actions/LogActions.js');

var LogActions = _interopRequireWildcard(_actionsLogActionsJs);

var log = LogActions.log.bind(null, 'keypad');

var Keypad = {
  _keys: [0x0F, 0x0F],
  _colidx: 0,

  reset: function reset() {
    Keypad._keys = [0x0F, 0x0F];
    Keypad._colidx = 0;
    log('Reset.');
  },

  rb: function rb() {
    switch (Keypad._colidx) {
      case 0x00:
        return 0x00;
        break;
      case 0x10:
        return Keypad._keys[0];
        break;
      case 0x20:
        return Keypad._keys[1];
        break;
      default:
        return 0x00;
        break;
    }
  },

  wb: function wb(v) {
    Keypad._colidx = v & 0x30;
  },

  keydown: function keydown(e) {
    switch (e.keyCode) {
      case 39:
        Keypad._keys[1] &= 0xE;
        break;
      case 37:
        Keypad._keys[1] &= 0xD;
        break;
      case 38:
        Keypad._keys[1] &= 0xB;
        break;
      case 40:
        Keypad._keys[1] &= 0x7;
        break;
      case 90:
        Keypad._keys[0] &= 0xE;
        break;
      case 88:
        Keypad._keys[0] &= 0xD;
        break;
      case 32:
        Keypad._keys[0] &= 0xB;
        break;
      case 13:
        Keypad._keys[0] &= 0x7;
        break;
    }
  },

  keyup: function keyup(e) {
    switch (e.keyCode) {
      case 39:
        Keypad._keys[1] |= 0x1;
        break;
      case 37:
        Keypad._keys[1] |= 0x2;
        break;
      case 38:
        Keypad._keys[1] |= 0x4;
        break;
      case 40:
        Keypad._keys[1] |= 0x8;
        break;
      case 90:
        Keypad._keys[0] |= 0x1;
        break;
      case 88:
        Keypad._keys[0] |= 0x2;
        break;
      case 32:
        Keypad._keys[0] |= 0x5;
        break;
      case 13:
        Keypad._keys[0] |= 0x8;
        break;
    }
  }
};

exports['default'] = Keypad;
module.exports = exports['default'];

},{"../../actions/LogActions.js":2}],15:[function(require,module,exports){
/**
 * The system timer
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mmuJs = require('./mmu.js');

var _mmuJs2 = _interopRequireDefault(_mmuJs);

var _z80Js = require('./z80.js');

var _z80Js2 = _interopRequireDefault(_z80Js);

// Bind our logger

var _actionsLogActionsJs = require('../../actions/LogActions.js');

var LogActions = _interopRequireWildcard(_actionsLogActionsJs);

var log = LogActions.log.bind(null, 'timer');

// Basic timer registers
var _div = 0;
var _tma = 0;
var _tima = 0;
var _tac = 0;

// The clock
var _clock = {
  main: 0,
  sub: 0,
  div: 0
};

var Timer = {
  reset: function reset() {
    _div = 0;
    _tma = 0;
    _tima = 0;
    _tac = 0;
    _clock.main = 0;
    _clock.sub = 0;
    _clock.div = 0;
    log('Reset');
  },

  step: function step() {
    _tima++;
    _clock.main = 0;
    if (_tima > 0xFF) {
      _tima = _tma;
      _mmuJs2['default']._if |= 4;
    }
  },

  inc: function inc(ticks) {
    var oldclk = _clock.main;

    _clock.sub += ticks;
    if (_clock.sub > 3) {
      _clock.main++;
      _clock.sub -= 4;

      _clock.div++;
      if (_clock.div == 16) {
        _clock.div = 0;
        _div++;
        _div &= 0xFF;
      }
    }

    if (_tac & 0x4) {
      switch (_tac & 0x3) {
        case 0:
          if (_clock.main >= 0x40) Timer.step();
          break;
        case 1:
          if (_clock.main >= 0x1) Timer.step();
          break;
        case 2:
          if (_clock.main >= 0x4) Timer.step();
          break;
        case 3:
          if (_clock.main >= 0x10) Timer.step();
          break;
      }
    }
  },

  rb: function rb(addr) {
    switch (addr) {
      case 0xFF04:
        return _div;
      case 0xFF05:
        return _tima;
      case 0xFF06:
        return _tma;
      case 0xFF07:
        return _tac;
    }
  },

  wb: function wb(addr, val) {
    switch (addr) {
      case 0xFF04:
        _div = 0;
        break;
      case 0xFF05:
        _tima = val;
        break;
      case 0xFF06:
        _tma = val;
        break;
      case 0xFF07:
        _tac = val & 7;
        break;
    }
  }
};

exports['default'] = Timer;
module.exports = exports['default'];

},{"../../actions/LogActions.js":2,"./mmu.js":17,"./z80.js":18}],16:[function(require,module,exports){
// GameBoy components
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mmuJs = require('./mmu.js');

var _mmuJs2 = _interopRequireDefault(_mmuJs);

var _z80Js = require('./z80.js');

var _z80Js2 = _interopRequireDefault(_z80Js);

// Bind our logger

var _actionsLogActionsJs = require('../../actions/LogActions.js');

var LogActions = _interopRequireWildcard(_actionsLogActionsJs);

var log = LogActions.log.bind(null, 'gpu');

// Image scalers
// import hq4x from '../hq.js';

var GPU = {
  _vram: null,
  _oam: null,
  _reg: [],
  _tilemap: [],
  _objdata: [],
  _objdatasorted: [],
  _palette: {
    'bg': [],
    'obj0': [],
    'obj1': []
  },
  _scanrow: [],

  _curline: 0,
  _curscan: 0,
  _linemode: 0,
  _modeclocks: 0,

  _yscrl: 0,
  _xscrl: 0,
  _raster: 0,
  _ints: 0,

  _lcdon: 0,
  _bgon: 0,
  _objon: 0,
  _winon: 0,

  _objsize: 0,

  _bgtilebase: 0x0000,
  _bgmapbase: 0x1800,
  _wintilebase: 0x1800,

  reset: function reset() {
    GPU._vram = new Uint8Array(0x2000);
    GPU._oam = new Uint8Array(0xA0);
    var white = [0xFF, 0xFF, 0xFF, 0xFF];
    GPU._palette.bg = new Uint8Array(white);
    GPU._palette.obj0 = new Uint8Array(white);
    GPU._palette.obj1 = new Uint8Array(white);
    for (var i = 0; i < 512; i++) {
      GPU._tilemap[i] = [];
      for (var j = 0; j < 8; j++) {
        GPU._tilemap[i][j] = new Uint8Array(8);
      }
    }

    log('Initialising screen');
    var c = document.getElementById('screen');
    if (c && c.getContext) {
      GPU._canvas = c.getContext('2d');
      if (!GPU._canvas) {
        throw new Error('GPU: Canvas context could not be created.');
      } else {
        if (GPU._canvas.createImageData) GPU._scrn = GPU._canvas.createImageData(160, 144);else if (GPU._canvas.getImageData) GPU._scrn = GPU._canvas.getImageData(0, 0, 160, 144);else GPU._scrn = {
          'width': 160,
          'height': 144,
          'data': new Array(160 * 144)
        };

        for (i = 0; i < GPU._scrn.data.length; i++) GPU._scrn.data[i] = 255;

        GPU._canvas.putImageData(GPU._scrn, 0, 0);
      }
    }

    GPU._curline = 0;
    GPU._curscan = 0;
    GPU._linemode = 2;
    GPU._modeclocks = 0;
    GPU._yscrl = 0;
    GPU._xscrl = 0;
    GPU._raster = 0;
    GPU._ints = 0;

    GPU._lcdon = 0;
    GPU._bgon = 0;
    GPU._objon = 0;
    GPU._winon = 0;

    GPU._objsize = 0;
    for (i = 0; i < 160; i++) GPU._scanrow[i] = 0;

    for (i = 0; i < 40; i++) {
      GPU._objdata[i] = {
        'y': -16,
        'x': -8,
        'tile': 0,
        'palette': 0,
        'yflip': 0,
        'xflip': 0,
        'prio': 0,
        'num': i
      };
    }

    // Set to values expected by BIOS, to start
    GPU._bgtilebase = 0x0000;
    GPU._bgmapbase = 0x1800;
    GPU._wintilebase = 0x1800;

    log('Reset');
  },

  /**
   * Apply an image scaler, e.g. hq4x
   *
   * @param Array srcData The source data to scale
   * @return Array Scaled image
   */
  imageScale: function imageScale(srcData) {},

  checkline: function checkline(ticks) {
    GPU._modeclocks += ticks;
    switch (GPU._linemode) {
      // In hblank
      case 0:
        if (GPU._modeclocks >= 51) {
          // End of hblank for last scanline; render screen
          if (GPU._curline == 143) {
            GPU._linemode = 1;
            GPU._canvas.putImageData(GPU._scrn, 0, 0);
            _mmuJs2['default']._if |= 1;
          } else {
            GPU._linemode = 2;
          }
          GPU._curline++;
          GPU._curscan += 640;
          GPU._modeclocks = 0;
        }
        break;

      // In vblank
      case 1:
        if (GPU._modeclocks >= 114) {
          GPU._modeclocks = 0;
          GPU._curline++;
          if (GPU._curline > 153) {
            GPU._curline = 0;
            GPU._curscan = 0;
            GPU._linemode = 2;
          }
        }
        break;

      // In OAM-read mode
      case 2:
        if (GPU._modeclocks >= 20) {
          GPU._modeclocks = 0;
          GPU._linemode = 3;
        }
        break;

      // In VRAM-read mode
      case 3:
        // Render scanline at end of allotted time
        if (GPU._modeclocks >= 43) {
          GPU._modeclocks = 0;
          GPU._linemode = 0;
          if (GPU._lcdon) {
            if (GPU._bgon) {
              var linebase = GPU._curscan;
              var mapbase = GPU._bgmapbase + ((GPU._curline + GPU._yscrl & 255) >> 3 << 5);
              var y = GPU._curline + GPU._yscrl & 7;
              var x = GPU._xscrl & 7;
              var t = GPU._xscrl >> 3 & 31;
              var pixel;
              var w = 160;

              if (GPU._bgtilebase) {
                var tile = GPU._vram[mapbase + t];
                if (tile < 128) tile = 256 + tile;
                var tilerow = GPU._tilemap[tile][y];
                do {
                  GPU._scanrow[160 - x] = tilerow[x];
                  GPU._scrn.data[linebase + 3] = GPU._palette.bg[tilerow[x]];
                  x++;
                  if (x == 8) {
                    t = t + 1 & 31;
                    x = 0;
                    tile = GPU._vram[mapbase + t];
                    if (tile < 128) tile = 256 + tile;
                    tilerow = GPU._tilemap[tile][y];
                  }
                  linebase += 4;
                } while (--w);
              } else {
                var tilerow = GPU._tilemap[GPU._vram[mapbase + t]][y];
                do {
                  GPU._scanrow[160 - x] = tilerow[x];
                  GPU._scrn.data[linebase + 3] = GPU._palette.bg[tilerow[x]];
                  x++;
                  if (x == 8) {
                    t = t + 1 & 31;
                    x = 0;
                    tilerow = GPU._tilemap[GPU._vram[mapbase + t]][y];
                  }
                  linebase += 4;
                } while (--w);
              }
            }
            if (GPU._objon) {
              var cnt = 0;
              if (GPU._objsize) {
                for (var i = 0; i < 40; i++) {}
              } else {
                var tilerow;
                var obj;
                var pal;
                var pixel;
                var x;
                var linebase = GPU._curscan;
                for (var i = 0; i < 40; i++) {
                  obj = GPU._objdatasorted[i];
                  if (obj.y <= GPU._curline && obj.y + 8 > GPU._curline) {
                    if (obj.yflip) tilerow = GPU._tilemap[obj.tile][7 - (GPU._curline - obj.y)];else tilerow = GPU._tilemap[obj.tile][GPU._curline - obj.y];

                    if (obj.palette) pal = GPU._palette.obj1;else pal = GPU._palette.obj0;

                    linebase = GPU._curline * 160 + obj.x << 2;
                    if (obj.xflip) {
                      for (x = 0; x < 8; x++) {
                        if (obj.x + x >= 0 && obj.x + x < 160) {
                          if (tilerow[7 - x] && (obj.prio || !GPU._scanrow[x])) {
                            GPU._scrn.data[linebase + 3] = pal[tilerow[7 - x]];
                          }
                        }
                        linebase += 4;
                      }
                    } else {
                      for (x = 0; x < 8; x++) {
                        if (obj.x + x >= 0 && obj.x + x < 160) {
                          if (tilerow[x] && (obj.prio || !GPU._scanrow[x])) {
                            GPU._scrn.data[linebase + 3] = pal[tilerow[x]];
                          }
                        }
                        linebase += 4;
                      }
                    }
                    cnt++;
                    if (cnt > 10) break;
                  }
                }
              }
            }
          }
        }
        break;
    }
  },

  updatetile: function updatetile(addr, val) {
    var saddr = addr;
    if (addr & 1) {
      saddr--;
      addr--;
    }
    var tile = addr >> 4 & 511;
    var y = addr >> 1 & 7;
    var sx;
    for (var x = 0; x < 8; x++) {
      sx = 1 << 7 - x;
      GPU._tilemap[tile][y][x] = (GPU._vram[saddr] & sx ? 1 : 0) | (GPU._vram[saddr + 1] & sx ? 2 : 0);
    }
  },

  updateoam: function updateoam(addr, val) {
    addr -= 0xFE00;
    var obj = addr >> 2;
    if (obj < 40) {
      switch (addr & 3) {
        case 0:
          GPU._objdata[obj].y = val - 16;
          break;
        case 1:
          GPU._objdata[obj].x = val - 8;
          break;
        case 2:
          if (GPU._objsize) GPU._objdata[obj].tile = val & 0xFE;else GPU._objdata[obj].tile = val;
          break;
        case 3:
          GPU._objdata[obj].palette = val & 0x10 ? 1 : 0;
          GPU._objdata[obj].xflip = val & 0x20 ? 1 : 0;
          GPU._objdata[obj].yflip = val & 0x40 ? 1 : 0;
          GPU._objdata[obj].prio = val & 0x80 ? 1 : 0;
          break;
      }
    }
    GPU._objdatasorted = GPU._objdata;
    GPU._objdatasorted.sort(function (a, b) {
      if (a.x > b.x) return -1;
      if (a.num > b.num) return -1;
    });
  },

  rb: function rb(addr) {
    var gaddr = addr - 0xFF40;
    switch (gaddr) {
      case 0:
        return (GPU._lcdon ? 0x80 : 0) | (GPU._bgtilebase == 0x0000 ? 0x10 : 0) | (GPU._bgmapbase == 0x1C00 ? 0x08 : 0) | (GPU._objsize ? 0x04 : 0) | (GPU._objon ? 0x02 : 0) | (GPU._bgon ? 0x01 : 0);

      case 1:
        return (GPU._curline == GPU._raster ? 4 : 0) | GPU._linemode;

      case 2:
        return GPU._yscrl;

      case 3:
        return GPU._xscrl;

      case 4:
        return GPU._curline;

      case 5:
        return GPU._raster;

      default:
        return GPU._reg[gaddr];
    }
  },

  wb: function wb(addr, val) {
    var gaddr = addr - 0xFF40;
    GPU._reg[gaddr] = val;
    switch (gaddr) {
      case 0:
        GPU._lcdon = val & 0x80 ? 1 : 0;
        GPU._bgtilebase = val & 0x10 ? 0x0000 : 0x0800;
        GPU._bgmapbase = val & 0x08 ? 0x1C00 : 0x1800;
        GPU._objsize = val & 0x04 ? 1 : 0;
        GPU._objon = val & 0x02 ? 1 : 0;
        GPU._bgon = val & 0x01 ? 1 : 0;
        break;

      case 2:
        GPU._yscrl = val;
        break;

      case 3:
        GPU._xscrl = val;
        break;

      case 5:
        GPU._raster = val;

      // OAM DMA
      case 6:
        var v;
        for (var i = 0; i < 160; i++) {
          v = _mmuJs2['default'].rb((val << 8) + i);
          GPU._oam[i] = v;
          GPU.updateoam(0xFE00 + i, v);
        }
        break;

      // BG palette mapping
      case 7:
        for (var i = 0; i < 4; i++) {
          switch (val >> i * 2 & 3) {
            case 0:
              GPU._palette.bg[i] = 0xFF;
              break;
            case 1:
              GPU._palette.bg[i] = 0xC0;
              break;
            case 2:
              GPU._palette.bg[i] = 0x60;
              break;
            case 3:
              GPU._palette.bg[i] = 0;
              break;
          }
        }
        break;

      // OBJ0 palette mapping
      case 8:
        for (var i = 0; i < 4; i++) {
          switch (val >> i * 2 & 3) {
            case 0:
              GPU._palette.obj0[i] = 0xFF;
              break;
            case 1:
              GPU._palette.obj0[i] = 0xC0;
              break;
            case 2:
              GPU._palette.obj0[i] = 0x60;
              break;
            case 3:
              GPU._palette.obj0[i] = 0;
              break;
          }
        }
        break;

      // OBJ1 palette mapping
      case 9:
        for (var i = 0; i < 4; i++) {
          switch (val >> i * 2 & 3) {
            case 0:
              GPU._palette.obj1[i] = 0xFF;
              break;
            case 1:
              GPU._palette.obj1[i] = 0xC0;
              break;
            case 2:
              GPU._palette.obj1[i] = 0x60;
              break;
            case 3:
              GPU._palette.obj1[i] = 0;
              break;
          }
        }
        break;
    }
  }
};

exports['default'] = GPU;
module.exports = exports['default'];

//    var scaled = hq4x(srcData, GPU._canvas.width, GPU._canvas.height);
//    return new ImageData(scaled, 640, 576);

},{"../../actions/LogActions.js":2,"./mmu.js":17,"./z80.js":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gpuJs = require('./gpu.js');

var _gpuJs2 = _interopRequireDefault(_gpuJs);

var _KeypadJs = require('./Keypad.js');

var _KeypadJs2 = _interopRequireDefault(_KeypadJs);

var _TimerJs = require('./Timer.js');

var _TimerJs2 = _interopRequireDefault(_TimerJs);

// Bind our logger

var _actionsLogActionsJs = require('../../actions/LogActions.js');

var LogActions = _interopRequireWildcard(_actionsLogActionsJs);

var log = LogActions.log.bind(null, 'mmu');

var MMU = {
  _bios: new Uint8Array([0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E, 0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0, 0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B, 0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9, 0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20, 0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04, 0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2, 0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06, 0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xF2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20, 0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17, 0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B, 0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E, 0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC, 0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3c, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x4C, 0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20, 0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50]),
  _rom: null,
  _carttype: 0,
  _mbc: [{}, {
    rombank: 0,
    rambank: 0,
    ramon: 0,
    mode: 0
  }],
  _romoffs: 0x4000,
  _ramoffs: 0,

  _eram: null,
  _wram: null,
  _zram: null,

  _inbios: 1,
  _ie: 0,
  _if: 0,

  /**
   * Getters
   */
  getRom: function getRom() {
    return MMU._rom;
  },

  reset: function reset() {
    MMU._wram = new Uint8Array(0x2000);
    MMU._eram = new Uint8Array(0x8000);
    MMU._zram = new Uint8Array(0x7f);

    MMU._inbios = 1;
    MMU._ie = 0;
    MMU._if = 0;

    MMU._carttype = 0;
    MMU._mbc[0] = {};
    MMU._mbc[1] = {
      rombank: 0,
      rambank: 0,
      ramon: 0,
      mode: 0
    };
    MMU._romoffs = 0x4000;
    MMU._ramoffs = 0;

    log('Reset');
  },

  /**
   * Load a buffer as the ROM
   * @param ArrayBuffer buffer The ROM itself
   */
  load: function load(buffer) {
    MMU._rom = new Uint8Array(buffer);
    MMU._carttype = MMU._rom[0x0147];

    log('ROM loaded, ' + MMU._rom.length + ' bytes');
  },

  rb: function rb(addr) {
    switch (addr & 0xF000) {
      // ROM bank 0
      case 0x0000:
        if (MMU._inbios) {
          if (addr < 0x0100) return MMU._bios[addr];else if (Z80._r.pc == 0x0100) {
            MMU._inbios = 0;
            log('Leaving BIOS');
          }
        } else {
          return MMU._rom[addr];
        }

      case 0x1000:
      case 0x2000:
      case 0x3000:
        return MMU._rom[addr];

      // ROM bank 1
      case 0x4000:
      case 0x5000:
      case 0x6000:
      case 0x7000:
        return MMU._rom[MMU._romoffs + (addr & 0x3FFF)];

      // VRAM
      case 0x8000:
      case 0x9000:
        return _gpuJs2['default']._vram[addr & 0x1FFF];

      // External RAM
      case 0xA000:
      case 0xB000:
        return MMU._eram[MMU._ramoffs + (addr & 0x1FFF)];

      // Work RAM and echo
      case 0xC000:
      case 0xD000:
      case 0xE000:
        return MMU._wram[addr & 0x1FFF];

      // Everything else
      case 0xF000:
        switch (addr & 0x0F00) {
          // Echo RAM
          case 0x000:
          case 0x100:
          case 0x200:
          case 0x300:
          case 0x400:
          case 0x500:
          case 0x600:
          case 0x700:
          case 0x800:
          case 0x900:
          case 0xA00:
          case 0xB00:
          case 0xC00:
          case 0xD00:
            return MMU._wram[addr & 0x1FFF];

          // OAM
          case 0xE00:
            return (addr & 0xFF) < 0xA0 ? _gpuJs2['default']._oam[addr & 0xFF] : 0;

          // Zeropage RAM, I/O, interrupts
          case 0xF00:
            if (addr == 0xFFFF) {
              return MMU._ie;
            } else if (addr > 0xFF7F) {
              return MMU._zram[addr & 0x7F];
            } else switch (addr & 0xF0) {
              case 0x00:
                switch (addr & 0xF) {
                  case 0:
                    return _KeypadJs2['default'].rb(); // JOYP
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    return _TimerJs2['default'].rb(addr);
                  case 15:
                    return MMU._if; // Interrupt flags
                  default:
                    return 0;
                }

              case 0x10:
              case 0x20:
              case 0x30:
                return 0;

              case 0x40:
              case 0x50:
              case 0x60:
              case 0x70:
                return _gpuJs2['default'].rb(addr);
            }
        }
    }
  },

  rw: function rw(addr) {
    return MMU.rb(addr) + (MMU.rb(addr + 1) << 8);
  },

  wb: function wb(addr, val) {
    switch (addr & 0xF000) {
      // ROM bank 0
      // MBC1: Turn external RAM on
      case 0x0000:
      case 0x1000:
        switch (MMU._carttype) {
          case 1:
            MMU._mbc[1].ramon = (val & 0xF) == 0xA ? 1 : 0;
            break;
        }
        break;

      // MBC1: ROM bank switch
      case 0x2000:
      case 0x3000:
        switch (MMU._carttype) {
          case 1:
            MMU._mbc[1].rombank &= 0x60;
            val &= 0x1F;
            if (!val) val = 1;
            MMU._mbc[1].rombank |= val;
            MMU._romoffs = MMU._mbc[1].rombank * 0x4000;
            break;
        }
        break;

      // ROM bank 1
      // MBC1: RAM bank switch
      case 0x4000:
      case 0x5000:
        switch (MMU._carttype) {
          case 1:
            if (MMU._mbc[1].mode) {
              MMU._mbc[1].rambank = val & 3;
              MMU._ramoffs = MMU._mbc[1].rambank * 0x2000;
            } else {
              MMU._mbc[1].rombank &= 0x1F;
              MMU._mbc[1].rombank |= (val & 3) << 5;
              MMU._romoffs = MMU._mbc[1].rombank * 0x4000;
            }
        }
        break;

      case 0x6000:
      case 0x7000:
        switch (MMU._carttype) {
          case 1:
            MMU._mbc[1].mode = val & 1;
            break;
        }
        break;

      // VRAM
      case 0x8000:
      case 0x9000:
        _gpuJs2['default']._vram[addr & 0x1FFF] = val;
        _gpuJs2['default'].updatetile(addr & 0x1FFF, val);
        break;

      // External RAM
      case 0xA000:
      case 0xB000:
        MMU._eram[MMU._ramoffs + (addr & 0x1FFF)] = val;
        break;

      // Work RAM and echo
      case 0xC000:
      case 0xD000:
      case 0xE000:
        MMU._wram[addr & 0x1FFF] = val;
        break;

      // Everything else
      case 0xF000:
        switch (addr & 0x0F00) {
          // Echo RAM
          case 0x000:
          case 0x100:
          case 0x200:
          case 0x300:
          case 0x400:
          case 0x500:
          case 0x600:
          case 0x700:
          case 0x800:
          case 0x900:
          case 0xA00:
          case 0xB00:
          case 0xC00:
          case 0xD00:
            MMU._wram[addr & 0x1FFF] = val;
            break;

          // OAM
          case 0xE00:
            if ((addr & 0xFF) < 0xA0) _gpuJs2['default']._oam[addr & 0xFF] = val;
            _gpuJs2['default'].updateoam(addr, val);
            break;

          // Zeropage RAM, I/O, interrupts
          case 0xF00:
            if (addr == 0xFFFF) {
              MMU._ie = val;
            } else if (addr > 0xFF7F) {
              MMU._zram[addr & 0x7F] = val;
            } else switch (addr & 0xF0) {
              case 0x00:
                switch (addr & 0xF) {
                  case 0:
                    _KeypadJs2['default'].wb(val);
                    break;
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    _TimerJs2['default'].wb(addr, val);
                    break;
                  case 15:
                    MMU._if = val;
                    break;
                }
                break;

              case 0x10:
              case 0x20:
              case 0x30:
                break;

              case 0x40:
              case 0x50:
              case 0x60:
              case 0x70:
                _gpuJs2['default'].wb(addr, val);
                break;
            }
        }
        break;
    }
  },

  ww: function ww(addr, val) {
    MMU.wb(addr, val & 255);
    MMU.wb(addr + 1, val >> 8);
  }
};

exports['default'] = MMU;
module.exports = exports['default'];

},{"../../actions/LogActions.js":2,"./Keypad.js":14,"./Timer.js":15,"./gpu.js":16}],18:[function(require,module,exports){
/**
 * jsGB: Z80 core
 * Joshua Koudys, Jul 2015
 * Imran Nazar, May 2009
 * Notes: This is a GameBoy Z80, not a Z80. There are differences. Mainly the F
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mmuJs = require('./mmu.js');

var _mmuJs2 = _interopRequireDefault(_mmuJs);

var _DebugJs = require('./Debug.js');

var _DebugJs2 = _interopRequireDefault(_DebugJs);

// Bind our logger

var _actionsLogActionsJs = require('../../actions/LogActions.js');

var LogActions = _interopRequireWildcard(_actionsLogActionsJs);

var log = LogActions.log.bind(null, 'z80');

/**
 * Flag constants
 * I have faith that a modern JIT, especially once es6 rolls around, will
 * be able to optimize a bunch of consts as equivalent to inlining them. Other
 * implementations use bools for the flags, but since F is actually a register,
 * this more C-like approach makes sense.
 */
// Set if result was zero
var F_ZERO = 0x80;
// Set if result was > 0xFF for addition, or < 0x00 for subtraction
var F_CARRY = 0x10;
// Set if lower nibble went > 0x0F for add, or upper nibble < 0xF0 for sub
var F_HCARRY = 0x20;
// Set if last op was a subtraction
var F_OP = 0x40;

/**
 * The Registers!
 * Where the magic happens - the main working space of the CPU
 * For 8 bit and 16 bit addressing, and to keep everything uint, they're all in
 * one space, and packed on 8 bit boundaries. Uint8Array and Uint16Arrays are
 * used to address the space. Modern JS! :)
 *
 * "The internal 8-bit registers are A, B, C, D, E, F, H, & L. These registers
 * may be used in pairs for 16-bit operations as AF, BC, DE, & HL. The two
 * remaining 16-bit registers are the program counter (PC) and the stack
 * pointer (SP)"
 * source: http://gameboy.mongenel.com/dmg/opcodes.html
 */

// Backwards-ordering allows pairing of registers as little-endian numbers
// L H E D C B F A PC SP
var registers = new ArrayBuffer(12);

// Address the byte-boundaries. Downside is, everything needs a [0], but
// the plus side is, actual uints in JS!
var regHL = new Uint16Array(registers, 0, 1);
var regDE = new Uint16Array(registers, 2, 1);
var regBC = new Uint16Array(registers, 4, 1);
var regAF = new Uint16Array(registers, 6, 1);
var regPC = new Uint16Array(registers, 8, 1);
var regSP = new Uint16Array(registers, 10, 1);

// Address 8-bit boundaries
var regL = new Uint8Array(registers, 0, 1);
var regH = new Uint8Array(registers, 1, 1);
var regE = new Uint8Array(registers, 2, 1);
var regD = new Uint8Array(registers, 3, 1);
var regC = new Uint8Array(registers, 4, 1);
var regB = new Uint8Array(registers, 5, 1);
var regF = new Uint8Array(registers, 6, 1);
var regA = new Uint8Array(registers, 7, 1);

// The Interrupts Enabled flag
var interruptsEnabled = true;

var Z80 = {
  _halt: false,
  _stop: false,

  // Clock speed, in Hz
  // TODO: add speed modes for GBC support
  speed: 4190000,

  reset: function reset() {
    //CPU Registers and Flags:
    regAF[0] = 0x01B0;
    regBC[0] = 0x0013;
    regDE[0] = 0x00D8;
    regHL[0] = 0x014D;
    regSP[0] = 0xFFFE;
    regPC[0] = 0x0100;

    Z80._halt = 0;
    Z80._stop = 0;
    interruptsEnabled = true;
    log('Reset');
  },

  isInterruptable: function isInterruptable() {
    return interruptsEnabled;
  },

  isHalted: function isHalted() {
    return Z80._halt;
  },

  disableInterrupts: function disableInterrupts() {
    interruptsEnabled = false;
  },

  enabledInterrupts: function enabledInterrupts() {
    interruptsEnabled = true;
  },

  /**
   * Execute the opcode pointed to by the program counter, and increment
   * the counter to the next code.
   * @return int Clock ticks
   */
  exec: function exec() {
    return _map[_mmuJs2['default'].rb(regPC[0]++)]();
  },

  /**
   * Get a nicely-formatted object with the registers state
   * @return object
   */
  getRegisters: function getRegisters() {
    return {
      a: regA[0],
      b: regB[0],
      c: regC[0],
      d: regD[0],
      e: regE[0],
      f: regF[0],
      hl: regHL[0],
      sp: regSP[0],
      pc: regPC[0],
      flags: {
        zero: !!(regF[0] & F_ZERO),
        carry: !!(regF[0] & F_CARRY),
        hcarry: !!(regF[0] & F_HCARRY),
        subtract: !!(regF[0] & F_OP)
      }
    };
  }
};

var _ops = {
  /*--- Load/store ---*/
  /**
   * Loads a register from another register
   * @param Uint8Array registerTo
   * @param Uint8Array registerFrom
   * @return int Clock ticks
   */
  ldReg: function ldReg(registerTo, registerFrom) {
    registerTo[0] = registerFrom[0];
    return 4;
  },

  /**
   * Loads a register with memory from HL
   * @param Uint8Array register
   * @return int Clock ticks
   */
  ldRegMem: function ldRegMem(register) {
    register[0] = _mmuJs2['default'].rb(regHL[0]);
    return 8;
  },

  /**
   * Load into memory from a register
   * @param Uint8Array register
   * @return int Clock ticks
   */
  ldMemReg: function ldMemReg(register) {
    _mmuJs2['default'].wb(regHL[0], register[0]);
    return 8;
  },

  /**
   * Load a literal value into a 8-bit register
   * LD B, n
   * @param Uint8Array register
   * @return int Clock ticks
   */
  ldRegVal: function ldRegVal(register) {
    register[0] = _mmuJs2['default'].rb(regPC[0]);
    regPC[0]++;
    return 8;
  },

  /**
   * Load a literal value into HL
   * @return int Clock ticks
   */
  LDHLmn: function LDHLmn() {
    _mmuJs2['default'].wb(regHL[0], _mmuJs2['default'].rb(regPC[0]));
    regPC[0]++;
    return 12;
  },

  LDBCmA: function LDBCmA() {
    _mmuJs2['default'].wb(regBC[0], regA[0]);
    return 8;
  },
  LDDEmA: function LDDEmA() {
    _mmuJs2['default'].wb(regDE[0], regA[0]);
    return 8;
  },

  LDmmA: function LDmmA() {
    _mmuJs2['default'].wb(_mmuJs2['default'].rw(regPC[0]), regA[0]);
    regPC[0] += 2;
    return 16;
  },

  LDABCm: function LDABCm() {
    regA[0] = _mmuJs2['default'].rb(regBC[0]);
    return 8;
  },
  LDADEm: function LDADEm() {
    regA[0] = _mmuJs2['default'].rb(regDE[0]);
    return 8;
  },

  LDAmm: function LDAmm() {
    regA[0] = _mmuJs2['default'].rb(_mmuJs2['default'].rw(regPC[0]));
    regPC[0] += 2;
    return 16;
  },

  /**
   * Load a 16-bit literal into a register
   * @param Uint16Array register
   * @return int Clock ticks
   */
  ldReg16Val: function ldReg16Val(register) {
    register[0] = _mmuJs2['default'].rw(regPC[0]);
    regPC[0] += 2;
    return 12;
  },

  LDHLmm: function LDHLmm() {
    var i = _mmuJs2['default'].rw(regPC[0]);
    regPC[0] += 2;
    regHL[0] = _mmuJs2['default'].rw(i);
    return 20;
  },
  LDmmHL: function LDmmHL() {
    var i = _mmuJs2['default'].rw(regPC[0]);
    regPC[0] += 2;
    _mmuJs2['default'].ww(i, regHL[0]);
    return 20;
  },

  // LD (mm), SP
  // Save SP to given address
  // 0x08
  LDmmSP: function LDmmSP() {
    var addr = _mmuJs2['default'].rw(regPC[0]);
    regPC[0] += 2;
    _mmuJs2['default'].ww(addr, regSP[0]);
    return 20;
  },

  // LDI (HL), A
  // Save A to address pointed to by HL, and increment HL
  LDHLIA: function LDHLIA() {
    _mmuJs2['default'].wb(regHL[0], regA[0]);
    regHL[0]++;
    return 8;
  },

  // LDI A, HL
  LDAHLI: function LDAHLI() {
    regA[0] = _mmuJs2['default'].rb(regHL[0]);
    regHL[0]++;
    return 8;
  },

  // LDD HL, A
  LDHLDA: function LDHLDA() {
    _mmuJs2['default'].wb(regHL[0], regA[0]);
    regHL[0]--;
    return 8;
  },

  // LDD A, HL
  LDAHLD: function LDAHLD() {
    regA[0] = _mmuJs2['default'].rb(regHL[0]);
    regHL[0]--;
    return 8;
  },

  LDAIOn: function LDAIOn() {
    regA[0] = _mmuJs2['default'].rb(0xFF00 + _mmuJs2['default'].rb(regPC[0]));
    regPC[0]++;
    return 12;
  },
  LDIOnA: function LDIOnA() {
    _mmuJs2['default'].wb(0xFF00 + _mmuJs2['default'].rb(regPC[0]), regA[0]);
    regPC[0]++;
    return 12;
  },
  LDAIOC: function LDAIOC() {
    regA[0] = _mmuJs2['default'].rb(0xFF00 + regC[0]);
    return 8;
  },
  LDIOCA: function LDIOCA() {
    _mmuJs2['default'].wb(0xFF00 + regC[0], regA[0]);
    return 8;
  },

  LDHLSPn: function LDHLSPn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) {
      i = -(~i + 1 & 0xFF);
    }
    regPC[0]++;
    i += regSP[0];
    regHL[0] = i;
    return 12;
  },

  // LD SP, HL
  // 0xF9
  LDSPHL: function LDSPHL() {
    regSP[0] = regHL[0];
    return 12;
  },

  /**
   * Swap nibbles in 8-bit register
   * @param Uint8Array register
   * @return int Clock ticks
   */
  swapNibbles: function swapNibbles(register) {
    var tr = register[0];
    register[0] = (tr & 0xF) << 4 | (tr & 0xF0) >> 4;
    regF[0] = register[0] ? 0 : F_ZERO;
    return 4;
  },

  /**
   * Swap nibbles in memory
   * @return int Clock ticks
   */
  swapNibblesMem: function swapNibblesMem() {
    var i = _mmuJs2['default'].rb(regHL[0]);
    i = (i & 0xF) << 4 | (i & 0xF0) >> 4;
    _mmuJs2['default'].wb(HL[0], i);
    // Best guess
    return 8;
  },

  /*--- Data processing ---*/
  /**
   * Add register to accumulator
   * @param Uint8Array register
   * @return int Clock ticks
   */
  addReg: function addReg(register) {
    var a = regA[0];
    regA[0] += register[0];
    // TODO: make sure all these '< a' checks actually make sense..
    regF[0] = (regA[0] < a ? 0x10 : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ register[0] ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 4;
  },

  // ADD A, (HL)
  // Add value pointed to by HL to A
  // 0x86
  ADDHL: function ADDHL() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regHL[0]);
    regA[0] += m;
    regF[0] = regA[0] < a ? F_CARRY : 0;
    if (!regA[0]) regF[0] |= F_ZERO;
    if ((regA[0] ^ a ^ m) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  ADDn: function ADDn() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regPC[0]);
    regA[0] += m;
    regPC[0]++;
    regF[0] = regA[0] < a ? F_CARRY : 0;
    if (!regA[0]) regF[0] |= F_ZERO;
    if ((regA[0] ^ a ^ m) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  /**
  * Add a 16-bit to HL
  * ADD HL, BC
  * @param Uint16Array register
  * @return int Clock ticks
  */
  addHLReg: function addHLReg(register) {
    var sum = regHL[0] + register[0];
    var flags = 0;
    if ((regHL[0] & 0xFFF) > (sum & 0xFFF)) {
      flags += F_HCARRY;
    }
    if (sum > 0xFFFF) {
      flags += F_CARRY;
    }
    regF[0] = (regF[0] & F_OP) + flags;
    regHL[0] = sum;
    return 12;
  },

  // ADD SP, n
  // 0xE8
  ADDSPn: function ADDSPn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) {
      i = -(~i + 1 & 0xFF);
    }
    regPC[0]++;
    regSP[0] += i;
    return 16;
  },

  /**
   * Add with carry
   * ADC A, n
   * @param Uint8Array register
   * @return int Clock ticks
   */
  adcReg: function adcReg(register) {
    var a = regA[0];
    regA[0] += register[0];
    regA[0] += regF[0] & F_CARRY ? 1 : 0;
    regF[0] = (regA[0] < a ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ register[0] ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 4;
  },

  ADCHL: function ADCHL() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regHL[0]);
    regA[0] += m + (regF[0] & F_CARRY ? 1 : 0);
    regF[0] = (regA[0] < a ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ m ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  // ADC A, n
  // Add 8-bit immediate and carry to A
  // 0xCE
  ADCn: function ADCn() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regPC[0]);
    a += m + (regF[0] & F_CARRY ? 1 : 0);
    regPC[0]++;
    regA[0] = a;
    regF[0] = (a > 0xFF ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ m ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  /**
   * Subtract register from accumulator, e.g. SUB A, B
   * @param Uint8Array register The register to load
   * @return int The clock ticks
   */
  subReg: function subReg(register) {
    var a = regA[0];
    a -= register[0];
    regA[0] = a;
    // All flags are updated
    regF[0] = F_OP | (a < 0 ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ register[0] ^ a) & 0x10) {
      regF[0] |= F_HCARRY;
    }
    return 1;
  },

  SUBHL: function SUBHL() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regHL[0]);
    a -= m;
    regA[0] = a;
    regF[0] = F_OP | (a < 0 ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ m ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  // Subtract 8-bit immediate from A
  // 0xD6
  SUBn: function SUBn() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regPC[0]);
    a -= m;
    regPC[0]++;
    regA[0] = a;
    regF[0] = F_OP | (a < 0 ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ m ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  /**
   * Subtract and carry register from A
   * @param Uint8Array register
   * @return int Clock ticks
   */
  subcReg: function subcReg(register) {
    var sum = regA[0] - register[0] - (regF[0] & F_CARRY ? 1 : 0);
    regA[0] = sum;
    var flags = F_OP | (regA[0] ? 0 : F_ZERO) | (sum < 0 ? F_CARRY : 0);
    if ((regA[0] ^ register[0] ^ sum) & 0x10) regF[0] |= F_HCARRY;
    return 4;
  },

  SBCHL: function SBCHL() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regHL[0]);
    a -= m - (regF[0] & F_CARRY ? 1 : 0);
    regA[0] = a;
    regF[0] = F_OP | (a < 0 ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ m ^ a) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  SBCn: function SBCn() {
    var a = regA[0];
    var m = _mmuJs2['default'].rb(regPC[0]);
    a -= m - (regF[0] & F_CARRY ? 1 : 0);
    regA[0] = a;
    regF[0] = F_OP | (a < 0 ? F_CARRY : 0) | (regA[0] ? 0 : F_ZERO);
    if ((regA[0] ^ m ^ a) & 0x10) regF[0] |= F_HCARRY;
    regPC[0]++;
    return 8;
  },

  /**
   * Compare 8-bit against accumulator
   * @param Uint8Array register
   * @return int Clock ticks
   */
  cpReg: function cpReg(register) {
    var i = regA[0];
    i -= register[0];
    // TODO: does this need an op flag?
    regF[0] = F_OP | (i < 0 ? F_CARRY : 0);
    i &= 0xFF;
    if (!i) regF[0] |= F_ZERO;
    if ((regA[0] ^ register[0] ^ i) & 0x10) regF[0] |= F_HCARRY;
    return 4;
  },

  CPHL: function CPHL() {
    var i = regA[0];
    var m = _mmuJs2['default'].rb(regHL[0]);
    i -= m;
    // TODO: check F_OP
    regF[0] = F_OP | (i < 0 ? F_CARRY : 0);
    i &= 0xFF;
    if (!i) regF[0] |= F_ZERO;
    if ((regA[0] ^ i ^ m) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  CPn: function CPn() {
    var i = regA[0];
    var m = _mmuJs2['default'].rb(regPC[0]);
    i -= m;
    regPC[0]++;
    regF[0] = F_OP | (i < 0 ? F_CARRY : 0);
    i &= 0xFF;
    if (!i) regF[0] |= F_ZERO;
    if ((regA[0] ^ i ^ m) & 0x10) regF[0] |= F_HCARRY;
    return 8;
  },

  /**
   * DAA - for dealing with 
   * 0x27
   */
  DAA: function DAA() {
    // Lookup from our table
    var daaLookupIdx = regA[0];
    daaLookupIdx |= (regF[0] & (F_CARRY | F_HCARRY | F_OP)) << 4;

    regAF[0] = daaTable[daaLookupIdx];
    return 16;
  },

  /**
   * Logic and a register with accumulator
   * @param Uint8Array register Register to AND
   * @return int Clock ticks
   */
  andReg: function andReg(register) {
    regA[0] &= register[0];
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 4;
  },

  ANDHL: function ANDHL() {
    regA[0] &= _mmuJs2['default'].rb(regHL[0]);
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 8;
  },

  // AND n
  // 0xE6
  ANDn: function ANDn() {
    regA[0] &= _mmuJs2['default'].rb(regPC[0]);
    regPC[0]++;
    regF[0] = (regA[0] ? 0 : F_ZERO) | F_HCARRY;
    return 8;
  },

  /**
   * Logic or a register with accumulator
   * @param Uint8Array register
   * @return int Clock ticks
   */
  orReg: function orReg(register) {
    regA[0] |= register[0];
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 4;
  },

  ORHL: function ORHL() {
    regA[0] |= _mmuJs2['default'].rb(regHL[0]);
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 8;
  },
  ORn: function ORn() {
    regA[0] |= _mmuJs2['default'].rb(regPC[0]);
    regPC[0]++;
    regF[0] = regA[0] ? 0 : 0x80;
    return 8;
  },

  /**
   * Logic xor a register with accumulator
   * @param Uint8Array register
   * @return int Clock ticks
   */
  xorReg: function xorReg(register) {
    regA[0] ^= register[0];
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 4;
  },

  XORHL: function XORHL() {
    regA[0] ^= _mmuJs2['default'].rb(regHL[0]);
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 8;
  },

  XORn: function XORn() {
    regA[0] ^= _mmuJs2['default'].rb(regPC[0]);
    regPC[0]++;
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 8;
  },

  /**
   * Increment 8-bit register
   * @param Uint8Array register
   * @return int Clock ticks
   */
  incReg: function incReg(register) {
    register[0]++;
    regF[0] = register[0] ? 0 : F_ZERO;
    return 4;
  },

  INCHLm: function INCHLm() {
    var i = _mmuJs2['default'].rb(regHL[0]) + 1;
    i &= 0xFF;
    _mmuJs2['default'].wb(regHL[0], i);
    regF[0] = i ? 0 : F_ZERO;
    return 12;
  },

  /**
   * Decrement an 8-bit register
   * DEC B
   * @param Uint8Array register
   * @return int Clock ticks
   */
  decReg: function decReg(register) {
    register[0]--;
    // Set the zero flag if 0, half-carry if decremented to 0b00001111, and
    // the subtract flag to true
    regF[0] = (register[0] ? 0 : F_ZERO) | ((register[0] & 0xF) === 0xF ? F_HCARRY : 0) | F_OP;
    return 4;
  },

  DECHLm: function DECHLm() {
    var i = _mmuJs2['default'].rb(regHL[0]) - 1;
    i &= 0xFF;
    _mmuJs2['default'].wb(regHL[0], i);
    regF[0] = i ? 0 : F_ZERO;
    return 12;
  },

  /**
   * Increment a 16-bit register
   * Needs a separate instruction as F is untouched on 16-bit
   * INC DE
   * @param Uint16Array register
   * @return int Clock ticks
   */
  incReg16: function incReg16(register) {
    register[0]++;
    return 4;
  },

  /**
   * Decrement a 16-bit register
   * Needs a separate instruction as F is untouched on 16-bit
   * DEC BC
   * @param Uint16Array register
   * @return int Clock ticks
   */
  decReg16: function decReg16(register) {
    register[0]--;
    return 4;
  },

  /*--- Bit manipulation ---*/
  /**
   * Set a register of a bitmask
   * Generalizes all the "SET 2, C" etc. instructions
   * @param int bitmask The bitmask to set
   * @param Uint8Array register The register to mask
   * @return int Clock ticks
   */
  setReg: function setReg(bitmask, register) {
    register[0] |= bitmask;
    return 8;
  },

  /**
    * Set a mem address of a bitmask
    * Generalizes all the "SET 2, (HL)" etc. instructions
    * @param int bitmask The bitmask to set
    * @return int Clock ticks
    */
  setMem: function setMem(bitmask) {
    var i = _mmuJs2['default'].rb(regHL[0]);
    i |= bitmask;
    _mmuJs2['default'].wb(regHL[0], i);
    return 16;
  },

  /**
   * Test a bit of a register
   * @param int bitmask The bit to test
   * @param Uint8Array register The register to test
   * @return int Clock ticks
   */
  bitReg: function bitReg(bitmask, register) {
    regF[0] &= 0x1F;
    regF[0] |= 0x20;
    regF[0] = register[0] & bitmask ? 0 : 0x80;
    return 8;
  },

  /**
   * Test a bit against memory
   * @param int bitmask
   * @return int Clock ticks
   */
  bitMem: function bitMem(bitmask) {
    regF[0] &= 0x1F;
    regF[0] |= 0x20;
    regF[0] = _mmuJs2['default'].rb(regHL[0]) & bitmask ? 0 : 0x80;
    return 12;
  },

  /**
   * Reset (clear) the bit of a register
   * @param int bitmask
   * @param Uint8Array register
   * @return int Clock ticks
   */
  resReg: function resReg(bitmask, register) {
    register[0] &= ~bitmask;
    return 8;
  },

  /**
   * Reset (clear) the bit of memory
   * @param int bitmask
   * @return int Clock ticks
   */
  resMem: function resMem(bitmask) {
    var i = _mmuJs2['default'].rb(regHL[0]);
    i &= ~bitmask;
    _mmuJs2['default'].wb(regHL[0], i);
    return 16;
  },

  RLA: function RLA() {
    var ci = regF[0] & F_CARRY ? 1 : 0;
    var co = regA[0] & 0x80 ? F_CARRY : 0;
    regA[0] = (regA[0] << 1) + ci;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 4;
  },
  RLCA: function RLCA() {
    var ci = regA[0] & 0x80 ? 1 : 0;
    var co = regA[0] & 0x80 ? F_CARRY : 0;
    regA[0] = (regA[0] << 1) + ci;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 4;
  },
  RRA: function RRA() {
    var ci = regF[0] & F_CARRY ? 0x80 : 0;
    var co = regA[0] & 1 ? F_CARRY : 0;
    regA[0] = (regA[0] >> 1) + ci;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 4;
  },
  RRCA: function RRCA() {
    var ci = regA[0] & 1 ? 0x80 : 0;
    var co = regA[0] & 1 ? F_CARRY : 0;
    regA[0] = (regA[0] >> 1) + ci;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 4;
  },

  /**
   * Rotate left
   * @param Uint8Array register
   * @return int Clock ticks
   */
  rlReg: function rlReg(register) {
    var ci = regF[0] & F_CARRY ? 1 : 0;
    var co = register[0] & 0x80 ? 0x10 : 0;
    register[0] = (register[0] << 1) + ci;
    regF[0] = register[0] ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 8;
  },

  RLHL: function RLHL() {
    var i = _mmuJs2['default'].rb(regHL[0]);
    var ci = regF[0] & F_CARRY ? 1 : 0;
    var co = i & 0x80 ? 0x10 : 0;
    i = (i << 1) + ci & 0xFF;
    regF[0] = i ? 0 : F_ZERO;
    _mmuJs2['default'].wb(regHL[0], i);
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 16;
  },

  /**
   * Rotate with left carry register
   * @param Uint8Array register
   * @return int Clock ticks
   */
  rlcReg: function rlcReg(register) {
    var ci = register[0] & 0x80 ? 1 : 0;
    var co = register[0] & 0x80 ? F_CARRY : 0;
    register[0] = (register[0] << 1) + ci;
    regF[0] = register[0] ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 8;
  },

  /**
   * Rotate memory left with carry register
   * @return int Clock ticks
   */
  RLCHL: function RLCHL() {
    var i = _mmuJs2['default'].rb(regHL[0]);
    var ci = i & 0x80 ? 1 : 0;
    var co = i & 0x80 ? F_CARRY : 0;
    i = (i << 1) + ci;
    i &= 0xFF;
    regF[0] = i ? 0 : F_ZERO;
    _mmuJs2['default'].wb(regHL[0], i);
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 16;
  },

  /**
   * Rotate right
   * @param Uint8Array register
   * @return int Clock ticks
   */
  rrReg: function rrReg(register) {
    var ci = regF[0] & 0x10 ? 0x80 : 0;
    var co = register[0] & 1 ? 0x10 : 0;
    register[0] = (register[0] >> 1) + ci;
    regF[0] = register[0] ? 0 : 0x80;
    regF[0] = (regF[0] & 0xEF) + co;
    return 8;
  },

  RRHL: function RRHL() {
    var i = _mmuJs2['default'].rb(regHL[0]);
    var ci = regF[0] & F_CARRY ? 0x80 : 0;
    var co = i & 1 ? F_CARRY : 0;
    i = (i >> 1) + ci;
    i &= 0xFF;
    _mmuJs2['default'].wb(regHL[0], i);
    regF[0] = i ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 16;
  },

  /**
   * Rotate right with carry
   * @param Uint8Array register
   * @return int Clock ticks
   */
  rrcReg: function rrcReg(register) {
    var ci = register[0] & 1 ? 0x80 : 0;
    var co = register[0] & 1 ? F_CARRY : 0;
    register[0] = (register[0] >> 1) + ci;
    regF[0] = register[0] ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 8;
  },

  RRCHL: function RRCHL() {
    var i = _mmuJs2['default'].rb(regHL[0]);
    var ci = i & 1 ? 0x80 : 0;
    var co = i & 1 ? F_CARRY : 0;
    i = (i >> 1) + ci;
    i &= 0xFF;
    _mmuJs2['default'].wb(regHL[0], i);
    regF[0] = i ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 16;
  },

  /**
   * Shift left preserving sign
   * @param Uint8Array register
   * @return int Clock ticks
   */
  slaReg: function slaReg(register) {
    var co = register[0] & 0x80 ? F_CARRY : 0;
    register[0] <<= 1;
    regF[0] = register[0] ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 8;
  },

  /**
   * Shift value in memory left, preserving sign
   * SLA (HL)
   * @return int Clock ticks
   */
  slaMem: function slaMem() {
    // Get val in memory
    var i = _mmuJs2['default'].rb(regHL[0]);
    // If top bit set, then we're carrying
    var carry = i & 0x80 ? F_CARRY : 0;
    i <<= 1;
    regF[0] = i ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + carry;
    // Best guess to the clock cycles
    return 16;
  },

  /**
   * Shift right preserving sign
   * @param Uint8Array register
   * @return int Clock ticks
   */
  sraReg: function sraReg(register) {
    var ci = register[0] & 0x80;
    var co = register[0] & 1 ? F_CARRY : 0;
    register[0] = (register[0] >> 1) + ci;
    regF[0] = register[0] ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 8;
  },

  /**
   * Shift value in memory right, preserving sign
   * SRA (HL)
   * @return int Clock ticks
   */
  sraMem: function sraMem() {
    // Get val in memory
    var i = _mmuJs2['default'].rb(regHL[0]);
    // If bottom bit set, then we're carrying
    var carry = i & 0x01 ? F_CARRY : 0;
    // Shift right
    i >>= 1;
    regF[0] = (i ? 0 : F_ZERO) | carry;
    //TODO Best guess to the clock cycles
    return 16;
  },

  /**
   * Shift right
   * @param Uint8Array register
   * @return int Clock ticks
   */
  srlReg: function srlReg(register) {
    var co = register[0] & 1 ? F_CARRY : 0;
    register[0] = register[0] >> 1;
    regF[0] = register[0] ? 0 : F_ZERO;
    regF[0] = (regF[0] & ~F_CARRY) + co;
    return 2;
  },

  /**
   * Shift value in memory right
   * @return int Clock ticks
   */
  srlMem: function srlMem() {
    var i = _mmuJs2['default'].rb(regHL[0]);
    var carry = i & 0x01 ? F_CARRY : 0;
    i >>= 1;
    regF[0] = (register[0] ? 0 : F_ZERO) | carry;
    return 16;
  },

  CPL: function CPL() {
    regA[0] ^= 0xFF;
    regF[0] = regA[0] ? 0 : F_ZERO;
    return 4;
  },
  NEG: function NEG() {
    regA[0] = 0 - regA[0];
    regF[0] = regA[0] < 0 ? F_CARRY : 0;
    if (!regA[0]) regF[0] |= F_ZERO;
    return 8;
  },

  CCF: function CCF() {
    var ci = regF[0] & 0x10 ? 0 : F_CARRY;
    regF[0] = (regF[0] & ~F_CARRY) + ci;
    return 4;
  },
  SCF: function SCF() {
    regF[0] |= F_CARRY;
    return 4;
  },

  /*--- Stack ---*/
  PUSHBC: function PUSHBC() {
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regB[0]);
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regC[0]);
    return 12;
  },
  PUSHDE: function PUSHDE() {
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regD[0]);
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regE[0]);
    return 12;
  },
  PUSHHL: function PUSHHL() {
    // TODO: check if this can use MMU.ww()
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regH[0]);
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regL[0]);
    return 12;
  },
  PUSHAF: function PUSHAF() {
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regA[0]);
    regSP[0]--;
    _mmuJs2['default'].wb(regSP[0], regF[0]);
    return 12;
  },

  POPBC: function POPBC() {
    regC[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    regB[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    return 12;
  },
  POPDE: function POPDE() {
    regE[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    regD[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    return 12;
  },
  POPHL: function POPHL() {
    // TODO check if this can use MMU.rw()
    regL[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    regH[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    return 12;
  },

  // POP AF
  // 0xF1
  POPAF: function POPAF() {
    // Flags register keeps bottom 4 bits clear
    regF[0] = _mmuJs2['default'].rb(regSP[0]) & 0xF0;
    regSP[0]++;
    regA[0] = _mmuJs2['default'].rb(regSP[0]);
    regSP[0]++;
    return 12;
  },

  /*--- Jump ---*/
  JPnn: function JPnn() {
    regPC[0] = _mmuJs2['default'].rw(regPC[0]);
    return 12;
  },
  JPHL: function JPHL() {
    regPC[0] = regHL[0];
    return 4;
  },
  JPNZnn: function JPNZnn() {
    if ((regF[0] & F_ZERO) === 0x00) {
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 16;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },
  JPZnn: function JPZnn() {
    if ((regF[0] & F_ZERO) === F_ZERO) {
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 16;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },
  JPNCnn: function JPNCnn() {
    if ((regF[0] & F_CARRY) === 0) {
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 16;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },
  JPCnn: function JPCnn() {
    if ((regF[0] & F_CARRY) !== 0) {
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 16;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },

  JRn: function JRn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) {
      i = -(~i + 1 & 0xFF);
    }
    regPC[0] += i + 1;
    return 12;
  },
  JRNZn: function JRNZn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) i = -(~i + 1 & 0xFF);
    regPC[0]++;
    if ((regF[0] & F_ZERO) === 0x00) {
      regPC[0] += i;
      return 12;
    } else {
      return 8;
    }
  },
  JRZn: function JRZn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) i = -(~i + 1 & 0xFF);
    regPC[0]++;
    if (regF[0] & F_ZERO) {
      regPC[0] += i;
      return 12;
    } else {
      return 8;
    }
  },
  JRNCn: function JRNCn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) i = -(~i + 1 & 0xFF);
    regPC[0]++;
    if ((regF[0] & F_CARRY) === 0) {
      regPC[0] += i;
      return 12;
    } else {
      return 8;
    }
  },
  JRCn: function JRCn() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    if (i > 0x7F) i = -(~i + 1 & 0xFF);
    regPC[0]++;
    if (regF[0] & F_CARRY) {
      regPC[0] += i;
      return 12;
    } else {
      return 8;
    }
  },

  /**
   * Stops processor and screen until button press
   * Its instruction is different than z80, which gives 0x10 as DJNZ (decrements
   * B and skips next instruction if B is zero).
   * STOP
   * @return int Clock ticks
   */
  stop: function stop() {
    // TODO: set a 'stop' mode, that waits for a button press
    // TODO: check if this instruction's overloaded to also change the CPU clock
    // speed on GBC
    return 0;
  },

  CALLnn: function CALLnn() {
    regSP[0] -= 2;
    _mmuJs2['default'].ww(regSP[0], regPC[0] + 2);
    regPC[0] = _mmuJs2['default'].rw(regPC[0]);
    return 20;
  },

  CALLNZnn: function CALLNZnn() {
    if ((regF[0] & F_ZERO) === 0x00) {
      regSP[0] -= 2;
      _mmuJs2['default'].ww(regSP[0], regPC[0] + 2);
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 20;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },

  CALLNCnn: function CALLNCnn() {
    if ((regF[0] & F_CARRY) === 0x00) {
      regSP[0] -= 2;
      _mmuJs2['default'].ww(regSP[0], regPC[0] + 2);
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 20;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },

  CALLCnn: function CALLCnn() {
    if ((regF[0] & 0x10) == 0x10) {
      regSP[0] -= 2;
      _mmuJs2['default'].ww(regSP[0], regPC[0] + 2);
      regPC[0] = _mmuJs2['default'].rw(regPC[0]);
      return 20;
    } else {
      regPC[0] += 2;
      return 12;
    }
  },

  RET: function RET() {
    regPC[0] = _mmuJs2['default'].rw(regSP[0]);
    regSP[0] += 2;
    return 12;
  },
  RETI: function RETI() {
    interruptsEnabled = true;
    _ops.rrs();
    regPC[0] = _mmuJs2['default'].rw(regSP[0]);
    regSP[0] += 2;
    return 12;
  },
  RETNZ: function RETNZ() {
    if ((regF[0] & F_ZERO) == 0x00) {
      regPC[0] = _mmuJs2['default'].rw(regSP[0]);
      regSP[0] += 2;
      return 12;
    } else {
      return 4;
    }
  },
  RETZ: function RETZ() {
    if (regF[0] & F_ZERO) {
      regPC[0] = _mmuJs2['default'].rw(regSP[0]);
      regSP[0] += 2;
      return 12;
    } else {
      return 4;
    }
  },
  RETNC: function RETNC() {
    if ((regF[0] & F_CARRY) == 0x00) {
      regPC[0] = _mmuJs2['default'].rw(regSP[0]);
      regSP[0] += 2;
      return 12;
    } else {
      return 4;
    }
  },
  RETC: function RETC() {
    if ((regF[0] & F_CARRY) == 0x10) {
      regPC[0] = _mmuJs2['default'].rw(regSP[0]);
      regSP[0] += 2;
      return 12;
    } else {
      return 4;
    }
  },

  /**
   * Call routine set at address
   * @param int addr Address of routine to run
   * @return int Clock ticks
   */
  rst: function rst(addr) {
    _ops.rsv();
    regSP[0] -= 2;
    _mmuJs2['default'].ww(regSP[0], regPC[0]);
    regPC[0] = addr;
    return 12;
  },

  NOP: function NOP() {
    return 4;
  },

  HALT: function HALT() {
    if (interruptsEnabled) {
      Z80._halt = true;
    }
    return 4;
  },

  DI: function DI() {
    interruptsEnabled = false;
    return 4;
  },

  // EI
  // Enable Interrupts
  // 0xFB
  EI: function EI() {
    interruptsEnabled = true;
    return 4;
  },

  /*--- Helper functions ---*/
  rsv: function rsv() {},

  rrs: function rrs() {},

  MAPcb: function MAPcb() {
    var i = _mmuJs2['default'].rb(regPC[0]);
    regPC[0]++;
    if (_cbmap[i]) {
      return _cbmap[i]();
    } else {
      return 0;
    }
  },

  XX: function XX(instruction) {
    /*Undefined map entry*/
    var opc = regPC[0] - 1;
    log('Unimplemented instruction ' + instruction + ' at $' + opc.toString(16) + ', stopping');
    Z80._stop = 1;
  }
};

var _map = [
// 00
_ops.NOP, _ops.ldReg16Val.bind(null, regBC), _ops.LDBCmA, _ops.incReg16.bind(null, regBC), _ops.incReg.bind(null, regB), _ops.decReg.bind(null, regB), _ops.ldRegVal.bind(null, regB), _ops.RLCA, _ops.LDmmSP, _ops.addHLReg.bind(null, regBC), _ops.LDABCm, _ops.decReg16.bind(null, regBC), _ops.incReg.bind(null, regC), _ops.decReg.bind(null, regC), _ops.ldRegVal.bind(null, regC), _ops.RRCA,
// 10
_ops.stop, _ops.ldReg16Val.bind(null, regDE), _ops.LDDEmA, _ops.incReg16.bind(null, regDE), _ops.incReg.bind(null, regD), _ops.decReg.bind(null, regD), _ops.ldRegVal.bind(null, regD), _ops.RLA, _ops.JRn, _ops.addHLReg.bind(null, regDE), _ops.LDADEm, _ops.decReg16.bind(null, regDE), _ops.incReg.bind(null, regE), _ops.decReg.bind(null, regE), _ops.ldRegVal.bind(null, regE), _ops.RRA,
// 20
_ops.JRNZn, _ops.ldReg16Val.bind(null, regHL), _ops.LDHLIA, _ops.incReg16.bind(null, regHL), _ops.incReg.bind(null, regH), _ops.decReg.bind(null, regH), _ops.ldRegVal.bind(null, regH), _ops.DAA, _ops.JRZn, _ops.addHLReg.bind(null, regHL), _ops.LDAHLI, _ops.decReg16.bind(null, regHL), _ops.incReg.bind(null, regL), _ops.decReg.bind(null, regL), _ops.ldRegVal.bind(null, regL), _ops.CPL,
// 30
_ops.JRNCn, _ops.ldReg16Val.bind(null, regSP), _ops.LDHLDA, _ops.incReg16.bind(null, regSP), _ops.INCHLm, _ops.DECHLm, _ops.LDHLmn, _ops.SCF, _ops.JRCn, _ops.addHLReg.bind(null, regSP), _ops.LDAHLD, _ops.decReg16.bind(null, regSP), _ops.incReg.bind(null, regA), _ops.decReg.bind(null, regA), _ops.ldRegVal.bind(null, regA), _ops.CCF,
// 40
_ops.ldReg.bind(null, regB, regB), _ops.ldReg.bind(null, regB, regC), _ops.ldReg.bind(null, regB, regD), _ops.ldReg.bind(null, regB, regE), _ops.ldReg.bind(null, regB, regH), _ops.ldReg.bind(null, regB, regL), _ops.ldRegMem.bind(null, regB), _ops.ldReg.bind(null, regB, regA), _ops.ldReg.bind(null, regC, regB), _ops.ldReg.bind(null, regC, regC), _ops.ldReg.bind(null, regC, regD), _ops.ldReg.bind(null, regC, regE), _ops.ldReg.bind(null, regC, regH), _ops.ldReg.bind(null, regC, regL), _ops.ldRegMem.bind(null, regC), _ops.ldReg.bind(null, regC, regA),
// 50
_ops.ldReg.bind(null, regD, regB), _ops.ldReg.bind(null, regD, regC), _ops.ldReg.bind(null, regD, regD), _ops.ldReg.bind(null, regD, regE), _ops.ldReg.bind(null, regD, regH), _ops.ldReg.bind(null, regD, regL), _ops.ldRegMem.bind(null, regD), _ops.ldReg.bind(null, regD, regA), _ops.ldReg.bind(null, regE, regB), _ops.ldReg.bind(null, regE, regC), _ops.ldReg.bind(null, regE, regD), _ops.ldReg.bind(null, regE, regE), _ops.ldReg.bind(null, regE, regH), _ops.ldReg.bind(null, regE, regL), _ops.ldRegMem.bind(null, regE), _ops.ldReg.bind(null, regE, regA),
// 60
_ops.ldReg.bind(null, regH, regB), _ops.ldReg.bind(null, regH, regC), _ops.ldReg.bind(null, regH, regD), _ops.ldReg.bind(null, regH, regE), _ops.ldReg.bind(null, regH, regH), _ops.ldReg.bind(null, regH, regL), _ops.ldRegMem.bind(null, regH), _ops.ldReg.bind(null, regH, regA), _ops.ldReg.bind(null, regL, regB), _ops.ldReg.bind(null, regL, regC), _ops.ldReg.bind(null, regL, regD), _ops.ldReg.bind(null, regL, regE), _ops.ldReg.bind(null, regL, regH), _ops.ldReg.bind(null, regL, regL), _ops.ldRegMem.bind(null, regL), _ops.ldReg.bind(null, regL, regA),
// 70
_ops.ldMemReg.bind(null, regB), _ops.ldMemReg.bind(null, regC), _ops.ldMemReg.bind(null, regD), _ops.ldMemReg.bind(null, regE), _ops.ldMemReg.bind(null, regH), _ops.ldMemReg.bind(null, regL), _ops.HALT, _ops.ldMemReg.bind(null, regA), _ops.ldReg.bind(null, regA, regB), _ops.ldReg.bind(null, regA, regC), _ops.ldReg.bind(null, regA, regD), _ops.ldReg.bind(null, regA, regE), _ops.ldReg.bind(null, regA, regH), _ops.ldReg.bind(null, regA, regL), _ops.ldRegMem.bind(null, regA), _ops.ldReg.bind(null, regA, regA),
// 80
_ops.addReg.bind(null, regB), _ops.addReg.bind(null, regC), _ops.addReg.bind(null, regD), _ops.addReg.bind(null, regE), _ops.addReg.bind(null, regH), _ops.addReg.bind(null, regL), _ops.ADDHL, _ops.addReg.bind(null, regA), //FIXME: optimize with << 1
_ops.adcReg.bind(null, regB), _ops.adcReg.bind(null, regC), _ops.adcReg.bind(null, regD), _ops.adcReg.bind(null, regE), _ops.adcReg.bind(null, regH), _ops.adcReg.bind(null, regL), _ops.ADCHL, _ops.adcReg.bind(null, regA),
// 90
_ops.subReg.bind(null, regB), _ops.subReg.bind(null, regC), _ops.subReg.bind(null, regD), _ops.subReg.bind(null, regE), _ops.subReg.bind(null, regH), _ops.subReg.bind(null, regL), _ops.SUBHL, _ops.subReg.bind(null, regA), // FIXME: SUB A, A could be optimized as a NOP
_ops.subcReg.bind(null, regB), _ops.subcReg.bind(null, regC), _ops.subcReg.bind(null, regD), _ops.subcReg.bind(null, regE), _ops.subcReg.bind(null, regH), _ops.subcReg.bind(null, regL), _ops.SBCHL, _ops.subcReg.bind(null, regA),
// A0
_ops.andReg.bind(null, regB), _ops.andReg.bind(null, regC), _ops.andReg.bind(null, regD), _ops.andReg.bind(null, regE), _ops.andReg.bind(null, regH), _ops.andReg.bind(null, regL), _ops.ANDHL, _ops.andReg.bind(null, regA), _ops.xorReg.bind(null, regB), _ops.xorReg.bind(null, regC), _ops.xorReg.bind(null, regD), _ops.xorReg.bind(null, regE), _ops.xorReg.bind(null, regH), _ops.xorReg.bind(null, regL), _ops.XORHL, _ops.xorReg.bind(null, regA),
// B0
_ops.orReg.bind(null, regB), _ops.orReg.bind(null, regC), _ops.orReg.bind(null, regD), _ops.orReg.bind(null, regE), _ops.orReg.bind(null, regH), _ops.orReg.bind(null, regL), _ops.ORHL, _ops.orReg.bind(null, regA), _ops.cpReg.bind(null, regB), _ops.cpReg.bind(null, regC), _ops.cpReg.bind(null, regD), _ops.cpReg.bind(null, regE), _ops.cpReg.bind(null, regH), _ops.cpReg.bind(null, regL), _ops.CPHL, _ops.cpReg.bind(null, regA),
// C0
_ops.RETNZ, _ops.POPBC, _ops.JPNZnn, _ops.JPnn, _ops.CALLNZnn, _ops.PUSHBC, _ops.ADDn, _ops.rst.bind(null, 0x00), _ops.RETZ, _ops.RET, _ops.JPZnn, _ops.MAPcb, _ops.CALLZnn, _ops.CALLnn, _ops.ADCn, _ops.rst.bind(null, 0x08),
// D0
_ops.RETNC, _ops.POPDE, _ops.JPNCnn, _ops.XX.bind(null, 'D3'), _ops.CALLNCnn, _ops.PUSHDE, _ops.SUBn, _ops.rst.bind(null, 0x10), _ops.RETC, _ops.RETI, _ops.JPCnn, _ops.XX.bind(null, 'DB'), _ops.CALLCnn, _ops.XX.bind(null, 'DD'), _ops.SBCn, _ops.rst.bind(null, 0x18),
// E0
_ops.LDIOnA, _ops.POPHL, _ops.LDIOCA, _ops.XX.bind(null, 'E3'), _ops.XX.bind(null, 'E4'), _ops.PUSHHL, _ops.ANDn, _ops.rst.bind(null, 0x20), _ops.ADDSPn, _ops.JPHL, _ops.LDmmA, _ops.XX.bind(null, 'EB'), _ops.XX.bind(null, 'EC'), _ops.XX.bind(null, 'ED'), _ops.XORn, _ops.rst.bind(null, 0x28),
// F0
_ops.LDAIOn, _ops.POPAF, _ops.LDAIOC, _ops.DI, _ops.XX.bind(null, 'F4'), _ops.PUSHAF, _ops.ORn, _ops.rst.bind(null, 0x30), _ops.LDHLSPn, _ops.LDSPHL, _ops.LDAmm, _ops.EI, _ops.XX.bind(null, 'FC'), _ops.XX.bind(null, 'FD'), _ops.CPn, _ops.rst.bind(null, 0x38)];

var _cbmap = [
// CB00
_ops.rlcReg.bind(null, regB), _ops.rlcReg.bind(null, regC), _ops.rlcReg.bind(null, regD), _ops.rlcReg.bind(null, regE), _ops.rlcReg.bind(null, regH), _ops.rlcReg.bind(null, regL), _ops.RLCHL, _ops.rlcReg.bind(null, regA), _ops.rrcReg.bind(null, regB), _ops.rrcReg.bind(null, regC), _ops.rrcReg.bind(null, regD), _ops.rrcReg.bind(null, regE), _ops.rrcReg.bind(null, regH), _ops.rrcReg.bind(null, regL), _ops.RRCHL, _ops.rrcReg.bind(null, regA),
// CB10
_ops.rlReg.bind(null, regB), _ops.rlReg.bind(null, regC), _ops.rlReg.bind(null, regD), _ops.rlReg.bind(null, regE), _ops.rlReg.bind(null, regH), _ops.rlReg.bind(null, regL), _ops.RLHL, _ops.rlReg.bind(null, regA), _ops.rrReg.bind(null, regB), _ops.rrReg.bind(null, regC), _ops.rrReg.bind(null, regD), _ops.rrReg.bind(null, regE), _ops.rrReg.bind(null, regH), _ops.rrReg.bind(null, regL), _ops.RRHL, _ops.rrReg.bind(null, regA),
// CB20
_ops.slaReg.bind(null, regB), _ops.slaReg.bind(null, regC), _ops.slaReg.bind(null, regD), _ops.slaReg.bind(null, regE), _ops.slaReg.bind(null, regH), _ops.slaReg.bind(null, regL), _ops.slaMem, _ops.slaReg.bind(null, regA), _ops.sraReg.bind(null, regB), _ops.sraReg.bind(null, regC), _ops.sraReg.bind(null, regD), _ops.sraReg.bind(null, regE), _ops.sraReg.bind(null, regH), _ops.sraReg.bind(null, regL), _ops.sraMem, _ops.sraReg.bind(null, regA),
// CB30
_ops.swapNibbles.bind(null, regB), _ops.swapNibbles.bind(null, regC), _ops.swapNibbles.bind(null, regD), _ops.swapNibbles.bind(null, regE), _ops.swapNibbles.bind(null, regH), _ops.swapNibbles.bind(null, regL), _ops.swapNibblesMem, _ops.swapNibbles.bind(null, regA), _ops.srlReg.bind(null, regB), _ops.srlReg.bind(null, regC), _ops.srlReg.bind(null, regD), _ops.srlReg.bind(null, regE), _ops.srlReg.bind(null, regH), _ops.srlReg.bind(null, regL), _ops.srlMem, _ops.srlReg.bind(null, regA),
// CB40
_ops.bitReg.bind(null, 0x01, regB), _ops.bitReg.bind(null, 0x01, regC), _ops.bitReg.bind(null, 0x01, regD), _ops.bitReg.bind(null, 0x01, regE), _ops.bitReg.bind(null, 0x01, regH), _ops.bitReg.bind(null, 0x01, regL), _ops.bitMem.bind(null, 0x01), _ops.bitReg.bind(null, 0x01, regA), _ops.bitReg.bind(null, 0x02, regB), _ops.bitReg.bind(null, 0x02, regC), _ops.bitReg.bind(null, 0x02, regD), _ops.bitReg.bind(null, 0x02, regE), _ops.bitReg.bind(null, 0x02, regH), _ops.bitReg.bind(null, 0x02, regL), _ops.bitMem.bind(null, 0x02), _ops.bitReg.bind(null, 0x02, regA),
// CB50
_ops.bitReg.bind(null, 0x04, regB), _ops.bitReg.bind(null, 0x04, regC), _ops.bitReg.bind(null, 0x04, regD), _ops.bitReg.bind(null, 0x04, regE), _ops.bitReg.bind(null, 0x04, regH), _ops.bitReg.bind(null, 0x04, regL), _ops.bitMem.bind(null, 0x04), _ops.bitReg.bind(null, 0x04, regA), _ops.bitReg.bind(null, 0x08, regB), _ops.bitReg.bind(null, 0x08, regC), _ops.bitReg.bind(null, 0x08, regD), _ops.bitReg.bind(null, 0x08, regE), _ops.bitReg.bind(null, 0x08, regH), _ops.bitReg.bind(null, 0x08, regL), _ops.bitMem.bind(null, 0x08), _ops.bitReg.bind(null, 0x08, regA),
// CB60
_ops.bitReg.bind(null, 0x10, regB), _ops.bitReg.bind(null, 0x10, regC), _ops.bitReg.bind(null, 0x10, regD), _ops.bitReg.bind(null, 0x10, regE), _ops.bitReg.bind(null, 0x10, regH), _ops.bitReg.bind(null, 0x10, regL), _ops.bitMem.bind(null, 0x10), _ops.bitReg.bind(null, 0x10, regA), _ops.bitReg.bind(null, 0x20, regB), _ops.bitReg.bind(null, 0x20, regC), _ops.bitReg.bind(null, 0x20, regD), _ops.bitReg.bind(null, 0x20, regE), _ops.bitReg.bind(null, 0x20, regH), _ops.bitReg.bind(null, 0x20, regL), _ops.bitMem.bind(null, 0x20), _ops.bitReg.bind(null, 0x20, regA),
// CB70
_ops.bitReg.bind(null, 0x40, regB), _ops.bitReg.bind(null, 0x40, regC), _ops.bitReg.bind(null, 0x40, regD), _ops.bitReg.bind(null, 0x40, regE), _ops.bitReg.bind(null, 0x40, regH), _ops.bitReg.bind(null, 0x40, regL), _ops.bitMem.bind(null, 0x40), _ops.bitReg.bind(null, 0x40, regA), _ops.bitReg.bind(null, 0x80, regB), _ops.bitReg.bind(null, 0x80, regC), _ops.bitReg.bind(null, 0x80, regD), _ops.bitReg.bind(null, 0x80, regE), _ops.bitReg.bind(null, 0x80, regH), _ops.bitReg.bind(null, 0x80, regL), _ops.bitMem.bind(null, 0x80), _ops.bitReg.bind(null, 0x80, regA),
// CB80
_ops.resReg.bind(null, 0x01, regB), _ops.resReg.bind(null, 0x01, regC), _ops.resReg.bind(null, 0x01, regD), _ops.resReg.bind(null, 0x01, regE), _ops.resReg.bind(null, 0x01, regH), _ops.resReg.bind(null, 0x01, regL), _ops.resMem.bind(null, 0x01), _ops.resReg.bind(null, 0x01, regA), _ops.resReg.bind(null, 0x02, regB), _ops.resReg.bind(null, 0x02, regC), _ops.resReg.bind(null, 0x02, regD), _ops.resReg.bind(null, 0x02, regE), _ops.resReg.bind(null, 0x02, regH), _ops.resReg.bind(null, 0x02, regL), _ops.resMem.bind(null, 0x02), _ops.resReg.bind(null, 0x02, regA),
// CB90
_ops.resReg.bind(null, 0x04, regB), _ops.resReg.bind(null, 0x04, regC), _ops.resReg.bind(null, 0x04, regD), _ops.resReg.bind(null, 0x04, regE), _ops.resReg.bind(null, 0x04, regH), _ops.resReg.bind(null, 0x04, regL), _ops.resMem.bind(null, 0x04), _ops.resReg.bind(null, 0x04, regA), _ops.resReg.bind(null, 0x08, regB), _ops.resReg.bind(null, 0x08, regC), _ops.resReg.bind(null, 0x08, regD), _ops.resReg.bind(null, 0x08, regE), _ops.resReg.bind(null, 0x08, regH), _ops.resReg.bind(null, 0x08, regL), _ops.resMem.bind(null, 0x08), _ops.resReg.bind(null, 0x08, regA),
// CBA0
_ops.resReg.bind(null, 0x10, regB), _ops.resReg.bind(null, 0x10, regC), _ops.resReg.bind(null, 0x10, regD), _ops.resReg.bind(null, 0x10, regE), _ops.resReg.bind(null, 0x10, regH), _ops.resReg.bind(null, 0x10, regL), _ops.resMem.bind(null, 0x10), _ops.resReg.bind(null, 0x10, regA), _ops.resReg.bind(null, 0x20, regB), _ops.resReg.bind(null, 0x20, regC), _ops.resReg.bind(null, 0x20, regD), _ops.resReg.bind(null, 0x20, regE), _ops.resReg.bind(null, 0x20, regH), _ops.resReg.bind(null, 0x20, regL), _ops.resMem.bind(null, 0x20), _ops.resReg.bind(null, 0x20, regA),
// CBB0
_ops.resReg.bind(null, 0x40, regB), _ops.resReg.bind(null, 0x40, regC), _ops.resReg.bind(null, 0x40, regD), _ops.resReg.bind(null, 0x40, regE), _ops.resReg.bind(null, 0x40, regH), _ops.resReg.bind(null, 0x40, regL), _ops.resMem.bind(null, 0x40), _ops.resReg.bind(null, 0x40, regA), _ops.resReg.bind(null, 0x80, regB), _ops.resReg.bind(null, 0x80, regC), _ops.resReg.bind(null, 0x80, regD), _ops.resReg.bind(null, 0x80, regE), _ops.resReg.bind(null, 0x80, regH), _ops.resReg.bind(null, 0x80, regL), _ops.resMem.bind(null, 0x80), _ops.resReg.bind(null, 0x80, regA),
// CBC0
_ops.setReg.bind(null, 0x01, regB), _ops.setReg.bind(null, 0x01, regC), _ops.setReg.bind(null, 0x01, regD), _ops.setReg.bind(null, 0x01, regE), _ops.setReg.bind(null, 0x01, regH), _ops.setReg.bind(null, 0x01, regL), _ops.setMem.bind(null, 0x01), _ops.setReg.bind(null, 0x01, regA), _ops.setReg.bind(null, 0x02, regB), _ops.setReg.bind(null, 0x02, regC), _ops.setReg.bind(null, 0x02, regD), _ops.setReg.bind(null, 0x02, regE), _ops.setReg.bind(null, 0x02, regH), _ops.setReg.bind(null, 0x02, regL), _ops.setMem.bind(null, 0x02), _ops.setReg.bind(null, 0x02, regA),
// CBD0
_ops.setReg.bind(null, 0x04, regB), _ops.setReg.bind(null, 0x04, regC), _ops.setReg.bind(null, 0x04, regD), _ops.setReg.bind(null, 0x04, regE), _ops.setReg.bind(null, 0x04, regH), _ops.setReg.bind(null, 0x04, regL), _ops.setMem.bind(null, 0x04), _ops.setReg.bind(null, 0x04, regA), _ops.setReg.bind(null, 0x08, regB), _ops.setReg.bind(null, 0x08, regC), _ops.setReg.bind(null, 0x08, regD), _ops.setReg.bind(null, 0x08, regE), _ops.setReg.bind(null, 0x08, regH), _ops.setReg.bind(null, 0x08, regL), _ops.setMem.bind(null, 0x08), _ops.setReg.bind(null, 0x08, regA),
// CBE0
_ops.setReg.bind(null, 0x10, regB), _ops.setReg.bind(null, 0x10, regC), _ops.setReg.bind(null, 0x10, regD), _ops.setReg.bind(null, 0x10, regE), _ops.setReg.bind(null, 0x10, regH), _ops.setReg.bind(null, 0x10, regL), _ops.setMem.bind(null, 0x10), _ops.setReg.bind(null, 0x10, regA), _ops.setReg.bind(null, 0x20, regB), _ops.setReg.bind(null, 0x20, regC), _ops.setReg.bind(null, 0x20, regD), _ops.setReg.bind(null, 0x20, regE), _ops.setReg.bind(null, 0x20, regH), _ops.setReg.bind(null, 0x20, regL), _ops.setMem.bind(null, 0x20), _ops.setReg.bind(null, 0x20, regA),
// CBF0
_ops.setReg.bind(null, 0x40, regB), _ops.setReg.bind(null, 0x40, regC), _ops.setReg.bind(null, 0x40, regD), _ops.setReg.bind(null, 0x40, regE), _ops.setReg.bind(null, 0x40, regH), _ops.setReg.bind(null, 0x40, regL), _ops.setMem.bind(null, 0x40), _ops.setReg.bind(null, 0x40, regA), _ops.setReg.bind(null, 0x80, regB), _ops.setReg.bind(null, 0x80, regC), _ops.setReg.bind(null, 0x80, regD), _ops.setReg.bind(null, 0x80, regE), _ops.setReg.bind(null, 0x80, regH), _ops.setReg.bind(null, 0x80, regL), _ops.setMem.bind(null, 0x80), _ops.setReg.bind(null, 0x80, regA)];

/**
 * A table used for fast lookups for the DAA instruction, aka convert to BCD.
 * BCD is critical to gaming applications, since most numbers will need to
 * be BCD in order to present them to the player. This makes a fast table
 * preferable to trying to replicate the DAA logic the z80 follows, as we're
 * essentially using a little more space in-memory to reduce some tough-to-debug
 * logic around BCD + flag setting. More importantly, that DAA logic was
 * brain-meltingly complex.
 *
 * credit to mednafen, where I found this table built. Sets to AF.
 */
var daaTable = new Uint16Array([0x0080, 0x0100, 0x0200, 0x0300, 0x0400, 0x0500, 0x0600, 0x0700, 0x0800, 0x0900, 0x1000, 0x1100, 0x1200, 0x1300, 0x1400, 0x1500, 0x1000, 0x1100, 0x1200, 0x1300, 0x1400, 0x1500, 0x1600, 0x1700, 0x1800, 0x1900, 0x2000, 0x2100, 0x2200, 0x2300, 0x2400, 0x2500, 0x2000, 0x2100, 0x2200, 0x2300, 0x2400, 0x2500, 0x2600, 0x2700, 0x2800, 0x2900, 0x3000, 0x3100, 0x3200, 0x3300, 0x3400, 0x3500, 0x3000, 0x3100, 0x3200, 0x3300, 0x3400, 0x3500, 0x3600, 0x3700, 0x3800, 0x3900, 0x4000, 0x4100, 0x4200, 0x4300, 0x4400, 0x4500, 0x4000, 0x4100, 0x4200, 0x4300, 0x4400, 0x4500, 0x4600, 0x4700, 0x4800, 0x4900, 0x5000, 0x5100, 0x5200, 0x5300, 0x5400, 0x5500, 0x5000, 0x5100, 0x5200, 0x5300, 0x5400, 0x5500, 0x5600, 0x5700, 0x5800, 0x5900, 0x6000, 0x6100, 0x6200, 0x6300, 0x6400, 0x6500, 0x6000, 0x6100, 0x6200, 0x6300, 0x6400, 0x6500, 0x6600, 0x6700, 0x6800, 0x6900, 0x7000, 0x7100, 0x7200, 0x7300, 0x7400, 0x7500, 0x7000, 0x7100, 0x7200, 0x7300, 0x7400, 0x7500, 0x7600, 0x7700, 0x7800, 0x7900, 0x8000, 0x8100, 0x8200, 0x8300, 0x8400, 0x8500, 0x8000, 0x8100, 0x8200, 0x8300, 0x8400, 0x8500, 0x8600, 0x8700, 0x8800, 0x8900, 0x9000, 0x9100, 0x9200, 0x9300, 0x9400, 0x9500, 0x9000, 0x9100, 0x9200, 0x9300, 0x9400, 0x9500, 0x9600, 0x9700, 0x9800, 0x9900, 0x0090, 0x0110, 0x0210, 0x0310, 0x0410, 0x0510, 0x0090, 0x0110, 0x0210, 0x0310, 0x0410, 0x0510, 0x0610, 0x0710, 0x0810, 0x0910, 0x1010, 0x1110, 0x1210, 0x1310, 0x1410, 0x1510, 0x1010, 0x1110, 0x1210, 0x1310, 0x1410, 0x1510, 0x1610, 0x1710, 0x1810, 0x1910, 0x2010, 0x2110, 0x2210, 0x2310, 0x2410, 0x2510, 0x2010, 0x2110, 0x2210, 0x2310, 0x2410, 0x2510, 0x2610, 0x2710, 0x2810, 0x2910, 0x3010, 0x3110, 0x3210, 0x3310, 0x3410, 0x3510, 0x3010, 0x3110, 0x3210, 0x3310, 0x3410, 0x3510, 0x3610, 0x3710, 0x3810, 0x3910, 0x4010, 0x4110, 0x4210, 0x4310, 0x4410, 0x4510, 0x4010, 0x4110, 0x4210, 0x4310, 0x4410, 0x4510, 0x4610, 0x4710, 0x4810, 0x4910, 0x5010, 0x5110, 0x5210, 0x5310, 0x5410, 0x5510, 0x5010, 0x5110, 0x5210, 0x5310, 0x5410, 0x5510, 0x5610, 0x5710, 0x5810, 0x5910, 0x6010, 0x6110, 0x6210, 0x6310, 0x6410, 0x6510, 0x6010, 0x6110, 0x6210, 0x6310, 0x6410, 0x6510, 0x6610, 0x6710, 0x6810, 0x6910, 0x7010, 0x7110, 0x7210, 0x7310, 0x7410, 0x7510, 0x7010, 0x7110, 0x7210, 0x7310, 0x7410, 0x7510, 0x7610, 0x7710, 0x7810, 0x7910, 0x8010, 0x8110, 0x8210, 0x8310, 0x8410, 0x8510, 0x8010, 0x8110, 0x8210, 0x8310, 0x8410, 0x8510, 0x8610, 0x8710, 0x8810, 0x8910, 0x9010, 0x9110, 0x9210, 0x9310, 0x9410, 0x9510, 0x9010, 0x9110, 0x9210, 0x9310, 0x9410, 0x9510, 0x9610, 0x9710, 0x9810, 0x9910, 0xA010, 0xA110, 0xA210, 0xA310, 0xA410, 0xA510, 0xA010, 0xA110, 0xA210, 0xA310, 0xA410, 0xA510, 0xA610, 0xA710, 0xA810, 0xA910, 0xB010, 0xB110, 0xB210, 0xB310, 0xB410, 0xB510, 0xB010, 0xB110, 0xB210, 0xB310, 0xB410, 0xB510, 0xB610, 0xB710, 0xB810, 0xB910, 0xC010, 0xC110, 0xC210, 0xC310, 0xC410, 0xC510, 0xC010, 0xC110, 0xC210, 0xC310, 0xC410, 0xC510, 0xC610, 0xC710, 0xC810, 0xC910, 0xD010, 0xD110, 0xD210, 0xD310, 0xD410, 0xD510, 0xD010, 0xD110, 0xD210, 0xD310, 0xD410, 0xD510, 0xD610, 0xD710, 0xD810, 0xD910, 0xE010, 0xE110, 0xE210, 0xE310, 0xE410, 0xE510, 0xE010, 0xE110, 0xE210, 0xE310, 0xE410, 0xE510, 0xE610, 0xE710, 0xE810, 0xE910, 0xF010, 0xF110, 0xF210, 0xF310, 0xF410, 0xF510, 0xF010, 0xF110, 0xF210, 0xF310, 0xF410, 0xF510, 0xF610, 0xF710, 0xF810, 0xF910, 0x0090, 0x0110, 0x0210, 0x0310, 0x0410, 0x0510, 0x0090, 0x0110, 0x0210, 0x0310, 0x0410, 0x0510, 0x0610, 0x0710, 0x0810, 0x0910, 0x1010, 0x1110, 0x1210, 0x1310, 0x1410, 0x1510, 0x1010, 0x1110, 0x1210, 0x1310, 0x1410, 0x1510, 0x1610, 0x1710, 0x1810, 0x1910, 0x2010, 0x2110, 0x2210, 0x2310, 0x2410, 0x2510, 0x2010, 0x2110, 0x2210, 0x2310, 0x2410, 0x2510, 0x2610, 0x2710, 0x2810, 0x2910, 0x3010, 0x3110, 0x3210, 0x3310, 0x3410, 0x3510, 0x3010, 0x3110, 0x3210, 0x3310, 0x3410, 0x3510, 0x3610, 0x3710, 0x3810, 0x3910, 0x4010, 0x4110, 0x4210, 0x4310, 0x4410, 0x4510, 0x4010, 0x4110, 0x4210, 0x4310, 0x4410, 0x4510, 0x4610, 0x4710, 0x4810, 0x4910, 0x5010, 0x5110, 0x5210, 0x5310, 0x5410, 0x5510, 0x5010, 0x5110, 0x5210, 0x5310, 0x5410, 0x5510, 0x5610, 0x5710, 0x5810, 0x5910, 0x6010, 0x6110, 0x6210, 0x6310, 0x6410, 0x6510, 0x0600, 0x0700, 0x0800, 0x0900, 0x0A00, 0x0B00, 0x0C00, 0x0D00, 0x0E00, 0x0F00, 0x1000, 0x1100, 0x1200, 0x1300, 0x1400, 0x1500, 0x1600, 0x1700, 0x1800, 0x1900, 0x1A00, 0x1B00, 0x1C00, 0x1D00, 0x1E00, 0x1F00, 0x2000, 0x2100, 0x2200, 0x2300, 0x2400, 0x2500, 0x2600, 0x2700, 0x2800, 0x2900, 0x2A00, 0x2B00, 0x2C00, 0x2D00, 0x2E00, 0x2F00, 0x3000, 0x3100, 0x3200, 0x3300, 0x3400, 0x3500, 0x3600, 0x3700, 0x3800, 0x3900, 0x3A00, 0x3B00, 0x3C00, 0x3D00, 0x3E00, 0x3F00, 0x4000, 0x4100, 0x4200, 0x4300, 0x4400, 0x4500, 0x4600, 0x4700, 0x4800, 0x4900, 0x4A00, 0x4B00, 0x4C00, 0x4D00, 0x4E00, 0x4F00, 0x5000, 0x5100, 0x5200, 0x5300, 0x5400, 0x5500, 0x5600, 0x5700, 0x5800, 0x5900, 0x5A00, 0x5B00, 0x5C00, 0x5D00, 0x5E00, 0x5F00, 0x6000, 0x6100, 0x6200, 0x6300, 0x6400, 0x6500, 0x6600, 0x6700, 0x6800, 0x6900, 0x6A00, 0x6B00, 0x6C00, 0x6D00, 0x6E00, 0x6F00, 0x7000, 0x7100, 0x7200, 0x7300, 0x7400, 0x7500, 0x7600, 0x7700, 0x7800, 0x7900, 0x7A00, 0x7B00, 0x7C00, 0x7D00, 0x7E00, 0x7F00, 0x8000, 0x8100, 0x8200, 0x8300, 0x8400, 0x8500, 0x8600, 0x8700, 0x8800, 0x8900, 0x8A00, 0x8B00, 0x8C00, 0x8D00, 0x8E00, 0x8F00, 0x9000, 0x9100, 0x9200, 0x9300, 0x9400, 0x9500, 0x9600, 0x9700, 0x9800, 0x9900, 0x9A00, 0x9B00, 0x9C00, 0x9D00, 0x9E00, 0x9F00, 0x0090, 0x0110, 0x0210, 0x0310, 0x0410, 0x0510, 0x0610, 0x0710, 0x0810, 0x0910, 0x0A10, 0x0B10, 0x0C10, 0x0D10, 0x0E10, 0x0F10, 0x1010, 0x1110, 0x1210, 0x1310, 0x1410, 0x1510, 0x1610, 0x1710, 0x1810, 0x1910, 0x1A10, 0x1B10, 0x1C10, 0x1D10, 0x1E10, 0x1F10, 0x2010, 0x2110, 0x2210, 0x2310, 0x2410, 0x2510, 0x2610, 0x2710, 0x2810, 0x2910, 0x2A10, 0x2B10, 0x2C10, 0x2D10, 0x2E10, 0x2F10, 0x3010, 0x3110, 0x3210, 0x3310, 0x3410, 0x3510, 0x3610, 0x3710, 0x3810, 0x3910, 0x3A10, 0x3B10, 0x3C10, 0x3D10, 0x3E10, 0x3F10, 0x4010, 0x4110, 0x4210, 0x4310, 0x4410, 0x4510, 0x4610, 0x4710, 0x4810, 0x4910, 0x4A10, 0x4B10, 0x4C10, 0x4D10, 0x4E10, 0x4F10, 0x5010, 0x5110, 0x5210, 0x5310, 0x5410, 0x5510, 0x5610, 0x5710, 0x5810, 0x5910, 0x5A10, 0x5B10, 0x5C10, 0x5D10, 0x5E10, 0x5F10, 0x6010, 0x6110, 0x6210, 0x6310, 0x6410, 0x6510, 0x6610, 0x6710, 0x6810, 0x6910, 0x6A10, 0x6B10, 0x6C10, 0x6D10, 0x6E10, 0x6F10, 0x7010, 0x7110, 0x7210, 0x7310, 0x7410, 0x7510, 0x7610, 0x7710, 0x7810, 0x7910, 0x7A10, 0x7B10, 0x7C10, 0x7D10, 0x7E10, 0x7F10, 0x8010, 0x8110, 0x8210, 0x8310, 0x8410, 0x8510, 0x8610, 0x8710, 0x8810, 0x8910, 0x8A10, 0x8B10, 0x8C10, 0x8D10, 0x8E10, 0x8F10, 0x9010, 0x9110, 0x9210, 0x9310, 0x9410, 0x9510, 0x9610, 0x9710, 0x9810, 0x9910, 0x9A10, 0x9B10, 0x9C10, 0x9D10, 0x9E10, 0x9F10, 0xA010, 0xA110, 0xA210, 0xA310, 0xA410, 0xA510, 0xA610, 0xA710, 0xA810, 0xA910, 0xAA10, 0xAB10, 0xAC10, 0xAD10, 0xAE10, 0xAF10, 0xB010, 0xB110, 0xB210, 0xB310, 0xB410, 0xB510, 0xB610, 0xB710, 0xB810, 0xB910, 0xBA10, 0xBB10, 0xBC10, 0xBD10, 0xBE10, 0xBF10, 0xC010, 0xC110, 0xC210, 0xC310, 0xC410, 0xC510, 0xC610, 0xC710, 0xC810, 0xC910, 0xCA10, 0xCB10, 0xCC10, 0xCD10, 0xCE10, 0xCF10, 0xD010, 0xD110, 0xD210, 0xD310, 0xD410, 0xD510, 0xD610, 0xD710, 0xD810, 0xD910, 0xDA10, 0xDB10, 0xDC10, 0xDD10, 0xDE10, 0xDF10, 0xE010, 0xE110, 0xE210, 0xE310, 0xE410, 0xE510, 0xE610, 0xE710, 0xE810, 0xE910, 0xEA10, 0xEB10, 0xEC10, 0xED10, 0xEE10, 0xEF10, 0xF010, 0xF110, 0xF210, 0xF310, 0xF410, 0xF510, 0xF610, 0xF710, 0xF810, 0xF910, 0xFA10, 0xFB10, 0xFC10, 0xFD10, 0xFE10, 0xFF10, 0x0090, 0x0110, 0x0210, 0x0310, 0x0410, 0x0510, 0x0610, 0x0710, 0x0810, 0x0910, 0x0A10, 0x0B10, 0x0C10, 0x0D10, 0x0E10, 0x0F10, 0x1010, 0x1110, 0x1210, 0x1310, 0x1410, 0x1510, 0x1610, 0x1710, 0x1810, 0x1910, 0x1A10, 0x1B10, 0x1C10, 0x1D10, 0x1E10, 0x1F10, 0x2010, 0x2110, 0x2210, 0x2310, 0x2410, 0x2510, 0x2610, 0x2710, 0x2810, 0x2910, 0x2A10, 0x2B10, 0x2C10, 0x2D10, 0x2E10, 0x2F10, 0x3010, 0x3110, 0x3210, 0x3310, 0x3410, 0x3510, 0x3610, 0x3710, 0x3810, 0x3910, 0x3A10, 0x3B10, 0x3C10, 0x3D10, 0x3E10, 0x3F10, 0x4010, 0x4110, 0x4210, 0x4310, 0x4410, 0x4510, 0x4610, 0x4710, 0x4810, 0x4910, 0x4A10, 0x4B10, 0x4C10, 0x4D10, 0x4E10, 0x4F10, 0x5010, 0x5110, 0x5210, 0x5310, 0x5410, 0x5510, 0x5610, 0x5710, 0x5810, 0x5910, 0x5A10, 0x5B10, 0x5C10, 0x5D10, 0x5E10, 0x5F10, 0x6010, 0x6110, 0x6210, 0x6310, 0x6410, 0x6510, 0x00C0, 0x0140, 0x0240, 0x0340, 0x0440, 0x0540, 0x0640, 0x0740, 0x0840, 0x0940, 0x0A40, 0x0B40, 0x0C40, 0x0D40, 0x0E40, 0x0F40, 0x1040, 0x1140, 0x1240, 0x1340, 0x1440, 0x1540, 0x1640, 0x1740, 0x1840, 0x1940, 0x1A40, 0x1B40, 0x1C40, 0x1D40, 0x1E40, 0x1F40, 0x2040, 0x2140, 0x2240, 0x2340, 0x2440, 0x2540, 0x2640, 0x2740, 0x2840, 0x2940, 0x2A40, 0x2B40, 0x2C40, 0x2D40, 0x2E40, 0x2F40, 0x3040, 0x3140, 0x3240, 0x3340, 0x3440, 0x3540, 0x3640, 0x3740, 0x3840, 0x3940, 0x3A40, 0x3B40, 0x3C40, 0x3D40, 0x3E40, 0x3F40, 0x4040, 0x4140, 0x4240, 0x4340, 0x4440, 0x4540, 0x4640, 0x4740, 0x4840, 0x4940, 0x4A40, 0x4B40, 0x4C40, 0x4D40, 0x4E40, 0x4F40, 0x5040, 0x5140, 0x5240, 0x5340, 0x5440, 0x5540, 0x5640, 0x5740, 0x5840, 0x5940, 0x5A40, 0x5B40, 0x5C40, 0x5D40, 0x5E40, 0x5F40, 0x6040, 0x6140, 0x6240, 0x6340, 0x6440, 0x6540, 0x6640, 0x6740, 0x6840, 0x6940, 0x6A40, 0x6B40, 0x6C40, 0x6D40, 0x6E40, 0x6F40, 0x7040, 0x7140, 0x7240, 0x7340, 0x7440, 0x7540, 0x7640, 0x7740, 0x7840, 0x7940, 0x7A40, 0x7B40, 0x7C40, 0x7D40, 0x7E40, 0x7F40, 0x8040, 0x8140, 0x8240, 0x8340, 0x8440, 0x8540, 0x8640, 0x8740, 0x8840, 0x8940, 0x8A40, 0x8B40, 0x8C40, 0x8D40, 0x8E40, 0x8F40, 0x9040, 0x9140, 0x9240, 0x9340, 0x9440, 0x9540, 0x9640, 0x9740, 0x9840, 0x9940, 0x9A40, 0x9B40, 0x9C40, 0x9D40, 0x9E40, 0x9F40, 0xA040, 0xA140, 0xA240, 0xA340, 0xA440, 0xA540, 0xA640, 0xA740, 0xA840, 0xA940, 0xAA40, 0xAB40, 0xAC40, 0xAD40, 0xAE40, 0xAF40, 0xB040, 0xB140, 0xB240, 0xB340, 0xB440, 0xB540, 0xB640, 0xB740, 0xB840, 0xB940, 0xBA40, 0xBB40, 0xBC40, 0xBD40, 0xBE40, 0xBF40, 0xC040, 0xC140, 0xC240, 0xC340, 0xC440, 0xC540, 0xC640, 0xC740, 0xC840, 0xC940, 0xCA40, 0xCB40, 0xCC40, 0xCD40, 0xCE40, 0xCF40, 0xD040, 0xD140, 0xD240, 0xD340, 0xD440, 0xD540, 0xD640, 0xD740, 0xD840, 0xD940, 0xDA40, 0xDB40, 0xDC40, 0xDD40, 0xDE40, 0xDF40, 0xE040, 0xE140, 0xE240, 0xE340, 0xE440, 0xE540, 0xE640, 0xE740, 0xE840, 0xE940, 0xEA40, 0xEB40, 0xEC40, 0xED40, 0xEE40, 0xEF40, 0xF040, 0xF140, 0xF240, 0xF340, 0xF440, 0xF540, 0xF640, 0xF740, 0xF840, 0xF940, 0xFA40, 0xFB40, 0xFC40, 0xFD40, 0xFE40, 0xFF40, 0xA050, 0xA150, 0xA250, 0xA350, 0xA450, 0xA550, 0xA650, 0xA750, 0xA850, 0xA950, 0xAA50, 0xAB50, 0xAC50, 0xAD50, 0xAE50, 0xAF50, 0xB050, 0xB150, 0xB250, 0xB350, 0xB450, 0xB550, 0xB650, 0xB750, 0xB850, 0xB950, 0xBA50, 0xBB50, 0xBC50, 0xBD50, 0xBE50, 0xBF50, 0xC050, 0xC150, 0xC250, 0xC350, 0xC450, 0xC550, 0xC650, 0xC750, 0xC850, 0xC950, 0xCA50, 0xCB50, 0xCC50, 0xCD50, 0xCE50, 0xCF50, 0xD050, 0xD150, 0xD250, 0xD350, 0xD450, 0xD550, 0xD650, 0xD750, 0xD850, 0xD950, 0xDA50, 0xDB50, 0xDC50, 0xDD50, 0xDE50, 0xDF50, 0xE050, 0xE150, 0xE250, 0xE350, 0xE450, 0xE550, 0xE650, 0xE750, 0xE850, 0xE950, 0xEA50, 0xEB50, 0xEC50, 0xED50, 0xEE50, 0xEF50, 0xF050, 0xF150, 0xF250, 0xF350, 0xF450, 0xF550, 0xF650, 0xF750, 0xF850, 0xF950, 0xFA50, 0xFB50, 0xFC50, 0xFD50, 0xFE50, 0xFF50, 0x00D0, 0x0150, 0x0250, 0x0350, 0x0450, 0x0550, 0x0650, 0x0750, 0x0850, 0x0950, 0x0A50, 0x0B50, 0x0C50, 0x0D50, 0x0E50, 0x0F50, 0x1050, 0x1150, 0x1250, 0x1350, 0x1450, 0x1550, 0x1650, 0x1750, 0x1850, 0x1950, 0x1A50, 0x1B50, 0x1C50, 0x1D50, 0x1E50, 0x1F50, 0x2050, 0x2150, 0x2250, 0x2350, 0x2450, 0x2550, 0x2650, 0x2750, 0x2850, 0x2950, 0x2A50, 0x2B50, 0x2C50, 0x2D50, 0x2E50, 0x2F50, 0x3050, 0x3150, 0x3250, 0x3350, 0x3450, 0x3550, 0x3650, 0x3750, 0x3850, 0x3950, 0x3A50, 0x3B50, 0x3C50, 0x3D50, 0x3E50, 0x3F50, 0x4050, 0x4150, 0x4250, 0x4350, 0x4450, 0x4550, 0x4650, 0x4750, 0x4850, 0x4950, 0x4A50, 0x4B50, 0x4C50, 0x4D50, 0x4E50, 0x4F50, 0x5050, 0x5150, 0x5250, 0x5350, 0x5450, 0x5550, 0x5650, 0x5750, 0x5850, 0x5950, 0x5A50, 0x5B50, 0x5C50, 0x5D50, 0x5E50, 0x5F50, 0x6050, 0x6150, 0x6250, 0x6350, 0x6450, 0x6550, 0x6650, 0x6750, 0x6850, 0x6950, 0x6A50, 0x6B50, 0x6C50, 0x6D50, 0x6E50, 0x6F50, 0x7050, 0x7150, 0x7250, 0x7350, 0x7450, 0x7550, 0x7650, 0x7750, 0x7850, 0x7950, 0x7A50, 0x7B50, 0x7C50, 0x7D50, 0x7E50, 0x7F50, 0x8050, 0x8150, 0x8250, 0x8350, 0x8450, 0x8550, 0x8650, 0x8750, 0x8850, 0x8950, 0x8A50, 0x8B50, 0x8C50, 0x8D50, 0x8E50, 0x8F50, 0x9050, 0x9150, 0x9250, 0x9350, 0x9450, 0x9550, 0x9650, 0x9750, 0x9850, 0x9950, 0x9A50, 0x9B50, 0x9C50, 0x9D50, 0x9E50, 0x9F50, 0xFA40, 0xFB40, 0xFC40, 0xFD40, 0xFE40, 0xFF40, 0x00C0, 0x0140, 0x0240, 0x0340, 0x0440, 0x0540, 0x0640, 0x0740, 0x0840, 0x0940, 0x0A40, 0x0B40, 0x0C40, 0x0D40, 0x0E40, 0x0F40, 0x1040, 0x1140, 0x1240, 0x1340, 0x1440, 0x1540, 0x1640, 0x1740, 0x1840, 0x1940, 0x1A40, 0x1B40, 0x1C40, 0x1D40, 0x1E40, 0x1F40, 0x2040, 0x2140, 0x2240, 0x2340, 0x2440, 0x2540, 0x2640, 0x2740, 0x2840, 0x2940, 0x2A40, 0x2B40, 0x2C40, 0x2D40, 0x2E40, 0x2F40, 0x3040, 0x3140, 0x3240, 0x3340, 0x3440, 0x3540, 0x3640, 0x3740, 0x3840, 0x3940, 0x3A40, 0x3B40, 0x3C40, 0x3D40, 0x3E40, 0x3F40, 0x4040, 0x4140, 0x4240, 0x4340, 0x4440, 0x4540, 0x4640, 0x4740, 0x4840, 0x4940, 0x4A40, 0x4B40, 0x4C40, 0x4D40, 0x4E40, 0x4F40, 0x5040, 0x5140, 0x5240, 0x5340, 0x5440, 0x5540, 0x5640, 0x5740, 0x5840, 0x5940, 0x5A40, 0x5B40, 0x5C40, 0x5D40, 0x5E40, 0x5F40, 0x6040, 0x6140, 0x6240, 0x6340, 0x6440, 0x6540, 0x6640, 0x6740, 0x6840, 0x6940, 0x6A40, 0x6B40, 0x6C40, 0x6D40, 0x6E40, 0x6F40, 0x7040, 0x7140, 0x7240, 0x7340, 0x7440, 0x7540, 0x7640, 0x7740, 0x7840, 0x7940, 0x7A40, 0x7B40, 0x7C40, 0x7D40, 0x7E40, 0x7F40, 0x8040, 0x8140, 0x8240, 0x8340, 0x8440, 0x8540, 0x8640, 0x8740, 0x8840, 0x8940, 0x8A40, 0x8B40, 0x8C40, 0x8D40, 0x8E40, 0x8F40, 0x9040, 0x9140, 0x9240, 0x9340, 0x9440, 0x9540, 0x9640, 0x9740, 0x9840, 0x9940, 0x9A40, 0x9B40, 0x9C40, 0x9D40, 0x9E40, 0x9F40, 0xA040, 0xA140, 0xA240, 0xA340, 0xA440, 0xA540, 0xA640, 0xA740, 0xA840, 0xA940, 0xAA40, 0xAB40, 0xAC40, 0xAD40, 0xAE40, 0xAF40, 0xB040, 0xB140, 0xB240, 0xB340, 0xB440, 0xB540, 0xB640, 0xB740, 0xB840, 0xB940, 0xBA40, 0xBB40, 0xBC40, 0xBD40, 0xBE40, 0xBF40, 0xC040, 0xC140, 0xC240, 0xC340, 0xC440, 0xC540, 0xC640, 0xC740, 0xC840, 0xC940, 0xCA40, 0xCB40, 0xCC40, 0xCD40, 0xCE40, 0xCF40, 0xD040, 0xD140, 0xD240, 0xD340, 0xD440, 0xD540, 0xD640, 0xD740, 0xD840, 0xD940, 0xDA40, 0xDB40, 0xDC40, 0xDD40, 0xDE40, 0xDF40, 0xE040, 0xE140, 0xE240, 0xE340, 0xE440, 0xE540, 0xE640, 0xE740, 0xE840, 0xE940, 0xEA40, 0xEB40, 0xEC40, 0xED40, 0xEE40, 0xEF40, 0xF040, 0xF140, 0xF240, 0xF340, 0xF440, 0xF540, 0xF640, 0xF740, 0xF840, 0xF940, 0x9A50, 0x9B50, 0x9C50, 0x9D50, 0x9E50, 0x9F50, 0xA050, 0xA150, 0xA250, 0xA350, 0xA450, 0xA550, 0xA650, 0xA750, 0xA850, 0xA950, 0xAA50, 0xAB50, 0xAC50, 0xAD50, 0xAE50, 0xAF50, 0xB050, 0xB150, 0xB250, 0xB350, 0xB450, 0xB550, 0xB650, 0xB750, 0xB850, 0xB950, 0xBA50, 0xBB50, 0xBC50, 0xBD50, 0xBE50, 0xBF50, 0xC050, 0xC150, 0xC250, 0xC350, 0xC450, 0xC550, 0xC650, 0xC750, 0xC850, 0xC950, 0xCA50, 0xCB50, 0xCC50, 0xCD50, 0xCE50, 0xCF50, 0xD050, 0xD150, 0xD250, 0xD350, 0xD450, 0xD550, 0xD650, 0xD750, 0xD850, 0xD950, 0xDA50, 0xDB50, 0xDC50, 0xDD50, 0xDE50, 0xDF50, 0xE050, 0xE150, 0xE250, 0xE350, 0xE450, 0xE550, 0xE650, 0xE750, 0xE850, 0xE950, 0xEA50, 0xEB50, 0xEC50, 0xED50, 0xEE50, 0xEF50, 0xF050, 0xF150, 0xF250, 0xF350, 0xF450, 0xF550, 0xF650, 0xF750, 0xF850, 0xF950, 0xFA50, 0xFB50, 0xFC50, 0xFD50, 0xFE50, 0xFF50, 0x00D0, 0x0150, 0x0250, 0x0350, 0x0450, 0x0550, 0x0650, 0x0750, 0x0850, 0x0950, 0x0A50, 0x0B50, 0x0C50, 0x0D50, 0x0E50, 0x0F50, 0x1050, 0x1150, 0x1250, 0x1350, 0x1450, 0x1550, 0x1650, 0x1750, 0x1850, 0x1950, 0x1A50, 0x1B50, 0x1C50, 0x1D50, 0x1E50, 0x1F50, 0x2050, 0x2150, 0x2250, 0x2350, 0x2450, 0x2550, 0x2650, 0x2750, 0x2850, 0x2950, 0x2A50, 0x2B50, 0x2C50, 0x2D50, 0x2E50, 0x2F50, 0x3050, 0x3150, 0x3250, 0x3350, 0x3450, 0x3550, 0x3650, 0x3750, 0x3850, 0x3950, 0x3A50, 0x3B50, 0x3C50, 0x3D50, 0x3E50, 0x3F50, 0x4050, 0x4150, 0x4250, 0x4350, 0x4450, 0x4550, 0x4650, 0x4750, 0x4850, 0x4950, 0x4A50, 0x4B50, 0x4C50, 0x4D50, 0x4E50, 0x4F50, 0x5050, 0x5150, 0x5250, 0x5350, 0x5450, 0x5550, 0x5650, 0x5750, 0x5850, 0x5950, 0x5A50, 0x5B50, 0x5C50, 0x5D50, 0x5E50, 0x5F50, 0x6050, 0x6150, 0x6250, 0x6350, 0x6450, 0x6550, 0x6650, 0x6750, 0x6850, 0x6950, 0x6A50, 0x6B50, 0x6C50, 0x6D50, 0x6E50, 0x6F50, 0x7050, 0x7150, 0x7250, 0x7350, 0x7450, 0x7550, 0x7650, 0x7750, 0x7850, 0x7950, 0x7A50, 0x7B50, 0x7C50, 0x7D50, 0x7E50, 0x7F50, 0x8050, 0x8150, 0x8250, 0x8350, 0x8450, 0x8550, 0x8650, 0x8750, 0x8850, 0x8950, 0x8A50, 0x8B50, 0x8C50, 0x8D50, 0x8E50, 0x8F50, 0x9050, 0x9150, 0x9250, 0x9350, 0x9450, 0x9550, 0x9650, 0x9750, 0x9850, 0x9950]);

exports['default'] = Z80;
module.exports = exports['default'];

// TODO: save registers

// TODO restore registers

},{"../../actions/LogActions.js":2,"./Debug.js":13,"./mmu.js":17}],19:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],20:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher')

},{"./lib/Dispatcher":21}],21:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = require('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":22}],22:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}]},{},[9,3]);
