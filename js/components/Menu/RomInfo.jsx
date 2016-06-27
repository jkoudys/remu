import { createElement as ce } from 'react';

const RomInfo = ({ filename, name, size, type, systems }) => (
  ce('section', { id: 'rominfo' },
    ce('h3', null,
     ce('i', { className: 'fa fa-table' }),
     name || filename
    ),
    ce('dl', null,
      ce('dt', null, 'Filename'),
      ce('dd', null, filename),
      ce('dt', null, 'Size'),
      ce('dd', null, `${size >> 10} KiB`),
      ce('dt', null, 'Supported Systems'),
      ce('dd', null, systems.join(', ')),
      ce('dt', null, 'Type'),
      ce('dd', null, type),
    )
  )
);

export default RomInfo;
