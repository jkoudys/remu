import { createElement as ce } from 'react';
import { receiveRom } from '../actions/EmuActions.js';
const { assign } = Object;

function handleLoadFile({ target: { files } }) {
  const file = files[0];

  if (file) {
    assign(new FileReader(), {
      onload() {
        receiveRom(this.result, file.name);
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
  .then(rom => receiveRom(rom, url.slice(url.lastIndexOf('/') + 1)))
  .catch(({ message }) => console.error(`Failed to load ROM ${url}. ${message}`));
}

export default () => (
  ce('section', { className: 'romloader' },
    ce('fieldset', null,
      ce('div', null,
        ce('input', { type: 'file', onChange: handleLoadFile }),
        ce('i', { className: 'fa fa-folder-open-o' }),
        ' Open a File',
      ),
      ce('div', { onClick: handleLoadUrl },
        ce('i', { className: 'fa fa-globe' }),
        ' Open a URL',
      ),
    ),
  )
);
