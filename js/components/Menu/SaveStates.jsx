import { createElement as ce } from 'react';

const _fmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric' });

const SaveStates = ({ saves }) => (
  ce('section', { id: 'savestates' },
    ce('h3', null,
      ce('i', { className: 'fa fa-database' }),
      ' Save Games'
    ),
    ce('ul', null, saves.map(({ time }) => (
      ce('li', { key: time },
        ce('a', { className: 'loadsave' }, _fmt.format(time))
      ))),
      ce('li', null,
        ce('a', { className: 'newsave' }, 'Save New State')
      )
    ),
    ce('fieldset', null,
      ce('button', { title: 'Download battery save' },
        ce('i', { className: 'fa fa-download' })
      ),
      ce('button', { title: 'Upload battery save' },
        ce('i', { className: 'fa fa-upload' })
      )
    )
  )
);

export default SaveStates;
