import * as EmuActions from '../actions/EmuActions.js';
import Screen from './Screen.jsx';

handleLoadFile(ev) {
  const file = ev.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    EmuActions.receiveRom(this.result, file.name);
  };

  reader.readAsArrayBuffer(file);
}

handleLoadUrl(url) {
  const xhr = new XMLHttpRequest();
  url = '/tests/tetris.gb';
  xhr.open('GET', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    EmuActions.receiveRom(this.response, url.substring(url.lastIndexOf('/') + 1));
  };

  xhr.send();
}

class RomLoader extends React.Component {


  render() {
    return (
      <section className="romloader">
        <fieldset>
          <div>
            <input type="file" onChange={this.handleLoadFile}>
              <i className="fa fa-folder-open-o" /> Open a File
            </input>
          </div>
          <div onClick={this.handleLoadUrl}>
            <i className="fa fa-globe" /> Open a URL
          </div>
        </fieldset>
      </section>
    );
  }
}

export default RomLoader;
