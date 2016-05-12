import React from 'react';

import EmuStore from '../stores/EmuStore';
import Debug from '../utils/emulator/Debug';

export default () => (
  <section className="debugger">
    <h3>Debugger</h3>
    {(EmuStore.getRom() || []).slice(0x1000, 0x2000).map(Debug.disAsm)}
  </section>
);
