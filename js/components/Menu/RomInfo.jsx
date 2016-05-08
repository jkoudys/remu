import React from 'react';

const RomInfo = ({ filename, name, size, type, systems }) => (
  <section id="rominfo">
    <h3>
      <i className="fa fa-table" /> {name || filename}
    </h3>
    <dl>
      <dt>Filename</dt>
      <dd>{filename}</dd>
      <dt>Size</dt>
      <dd>{`${size >> 10} KiB`}</dd>
      <dt>Supported Systems</dt>
      <dd>{systems.join(', ')}</dd>
      <dt>Type</dt>
      <dd>{type}</dd>
    </dl>
  </section>
);

export default RomInfo;
