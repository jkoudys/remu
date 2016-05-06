import React from 'react';

import * as EmuActions from '../actions/EmuActions.js';
// import Screen from './Screen.jsx';

function handleLoadFile({ target }) {
  const file = target.files[0];

  if (file) {
    Object.assign(new FileReader(), {
      onload() {
        EmuActions.receiveRom(this.result, file.name);
      },
      onerror() {
        console.error('Error reading file.');
      },
    }).readAsArrayBuffer(file);
  }
}

function handleLoadUrl(url = '/tests/tetris.gb') {
  fetch(url)
  .then(res => res.arrayBuffer())
  .then(rom => EmuActions.receiveRom(rom, url.slice(url.lastIndexOf('/') + 1)))
  .catch(({ message }) => console.error(`Failed to load ROM ${url}. ${message}`));
}

export default () => (
  <section className="romloader">
    <fieldset>
      <div>
        <input type="file" onChange={handleLoadFile} />
        <i className="fa fa-folder-open-o" /> Open a File
      </div>
      <div onClick={handleLoadUrl}>
        <i className="fa fa-globe" /> Open a URL
      </div>
    </fieldset>
  </section>
);
