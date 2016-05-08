import React from 'react';

const EmulatorLog = ({ log }) => (
  <section id="emulatorlog">
    <h3>
      <i className="fa fa-list" /> Log
    </h3>
    <table>
      <tbody>
        {log.map(({ time, component, msg }, i) => (
          <tr key={`entry${i}`}>
            <td>{Math.floor((time - log[0].time) / 1000) + 's'}</td>
            <td>{component}</td>
            <td>{msg}</td>
          </tr>
          ))}
      </tbody>
    </table>
  </section>
);

export default EmulatorLog;
