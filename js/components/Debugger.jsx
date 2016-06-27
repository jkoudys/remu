import { createElement as ce } from 'react';

import EmuStore from '../stores/EmuStore';
import Debug from '../utils/emulator/Debug';

export default () => (
   ce('section', { className: 'debugger' },
     ce('h3', null, 'Debugger'),
   )
);
