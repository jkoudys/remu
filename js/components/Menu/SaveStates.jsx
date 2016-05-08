import React from 'react';

const _fmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric' });

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

export default SaveStates;
