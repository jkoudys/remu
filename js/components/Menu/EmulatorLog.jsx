import { createElement as ce } from 'react';

const EmulatorLog = ({ log }) => (
  ce('section', { id: 'emulatorlog' },
    ce('h3', null,
      ce('i', { class: 'fa fa-list' }, ' Log')
    ),
    ce('table', null,
      ce('tbody', null, log.map(({ time, component, msg }, i) => (
        ce('tr', { key: `entry${i}` },
          ce('td', null, `${Math.floor((time - log[0].time) / 1000)}s`),
          ce('td', null, component),
          ce('td', null, msg)
        )
      )))
    )
  )
);

export default EmulatorLog;
