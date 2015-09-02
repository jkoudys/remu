// GameBoy components
import MMU from './mmu.js';
import Z80 from './z80.js';

// Constants
const WIDTH = 160;
const HEIGHT = 144;
const ADDR_TILES = 0x0000;
const ADDR_BGMAP0 = 0x1800;
const ADDR_BGMAP1 = 0x1C00;

// TODO: encapsulate vram + oam
// Memory
var _vram;
var _tileMap0;
var _tileMap1;

// Drawing area
var _imageData;
/**
 * @param _screen Uint32Array Allows us to address each pixel at each index
 */
var _screen;
var _context;
const _palette = {};
const _tileSet = [];

// The background is one big map, so it makes sense to manage in its own canvas
var _bgLayer;
var _bgCtx;

var _yscrl = 0;
var _xscrl = 0;

// Build a palette that we can assign using the js engine's native endianness
function endFix(array) {
  return (new Uint32Array(new Uint8Array(array).buffer))[0];
}

const _colors = [
  endFix([0xFF, 0xFF, 0xFF, 0xFF]),
  endFix([0xC0, 0xC0, 0xC0, 0xFF]),
  endFix([0x60, 0x60, 0x60, 0xFF]),
  endFix([0, 0, 0, 0xFF])
];

const _greys = [0xFF, 0xC0, 0x60, 0];

const GPU = {
  _oam: null,
  _reg: [],
  _objdata: [],
  _objdatasorted: [],
  _scanrow: [],

  _curline: 0,
  _linemode: 0,
  _modeclocks: 0,

  _raster: 0,
  _ints: 0,

  _lcdon: 0,
  _bgon: 0,
  _objon: 0,
  _winon: 0,

  _objsize: 0,

  reset(cb) {
    // Zero out memory
    _vram = new Uint8Array(0x2000);
    _tileMap0 = _vram.subarray(0x1800, 0x1C00);

    GPU._oam = new Uint8Array(0xA0);

    // Setup an offscreen background, since this has a bunch of tiles
    _bgLayer = document.createElement('canvas');
    _bgLayer.width = 256;
    _bgLayer.height = 256;
    _bgCtx = _bgLayer.getContext('2d');

    // Build a bunch of new 8x8 tiles in our tilemap
    for (let i = 0; i < 0x200; i++) {
      _tileSet[i] = new ImageData(8, 8);
    }

    // Blank the screen
    GPU.blankScreen();

    // Init flags
    GPU._curline = 0;
    GPU._linemode = 2;
    GPU._modeclocks = 0;
    _yscrl = 0;
    _xscrl = 0;
    GPU._raster = 0;
    GPU._ints = 0;

    GPU._lcdon = 0;
    GPU._bgon = 0;
    GPU._objon = 0;
    GPU._winon = 0;

    GPU._objsize = 0;
    for (let i = 0; i < WIDTH; i++) GPU._scanrow[i] = 0;

    for (let i = 0; i < 40; i++) {
      GPU._objdata[i] = {
        'y': -16,
        'x': -8,
        'tile': 0,
        'palette': 0,
        'yflip': 0,
        'xflip': 0,
        'prio': 0,
        'num': i
      };
    }

    if (cb instanceof Function) {
      cb(null, 'Reset');
    }
  },

  /**
   * Update the video ram
   */
  setVram(addr, val) {
    _vram[addr] = val;

    // For performance, update our rendered tiles with the vram gets updated
    if (addr >= ADDR_BGMAP0) {
      GPU.updateBackground(addr);
    } else {
      GPU.updateTile(addr, val);
//      GPU.renderBackground();
    }
  },

  getVram(addr) {
    return _vram[addr];
  },

  attachCanvas(canvas) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    _context = canvas.getContext('2d');

    _imageData = _context.createImageData(WIDTH, HEIGHT);
    _screen = new Uint32Array(_imageData.data.buffer);

    GPU.blankScreen();
  },

  isAttached() {
    return !!_context;
  },

  blankScreen() {
    if (_imageData) {
      for (let i = 0; i < _screen.length; i++) {
        _screen[i] = _colors[3];
      }

      _context.putImageData(_imageData, 0, 0);
    }
  },

  renderBackground() {
    // TODO: support partial-background updates
    for (let tid = 0, x = 0, y = 0, len = _tileMap0.length;
         tid < len;
         tid++) {
      _bgCtx.putImageData(_tileSet[_tileMap0[tid]], x,  y);
      x += 8;
      if (x > 255) {
        x = 0;
        y += 8;
      }
    }
  },

  // Update a single tile
  updateBackground(addr) {
    var tid = addr - ADDR_BGMAP0;
    _bgCtx.putImageData(_tileSet[_tileMap0[tid]], (tid % 32) << 3, (tid >> 5) << 3);
  },

  checkline(ticks) {
    // TODO: emulate scanline rendering, by returning a partial canvas. Some games
    // rely on scanline magic to achieve cool effects, but simple games should
    // work without them. Ideally this could be turned on/off on a per/rom basis.
    // Non-scanline rendering is faster and smoother.
    GPU._modeclocks += ticks;
    switch (GPU._linemode) {
      // In hblank
      case 0:
        if (GPU._modeclocks >= 51) {
          // End of hblank for last scanline; render screen
          if (GPU._curline == 143) {
            GPU._linemode = 1;
            _context.putImageData(_imageData, 0, 0);
            _context.drawImage(_bgLayer, _xscrl, _yscrl);
            MMU._if |= 1;
          } else {
            GPU._linemode = 2;
          }
          GPU._curline++;
          GPU._modeclocks = 0;
        }
        break;

        // In vblank
      case 1:
        if (GPU._modeclocks >= 114) {
          GPU._modeclocks = 0;
          GPU._curline++;
          if (GPU._curline > 153) {
            GPU._curline = 0;
            GPU._linemode = 2;
          }
        }
        break;

        // In OAM-read mode
      case 2:
        if (GPU._modeclocks >= 20) {
          GPU._modeclocks = 0;
          GPU._linemode = 3;
        }
        break;

        // In VRAM-read mode
      case 3:
        // Render scanline at end of allotted time
        if (GPU._modeclocks >= 43) {
          GPU._modeclocks = 0;
          GPU._linemode = 0;
          /*
          if (GPU._lcdon) {
            if (GPU._bgon) {
              let linebase = GPU._curscan;
              let mapbase = GPU._bgmapbase + ((((GPU._curline + GPU._yscrl) & 0xFF) >> 3) << 5);
              let y = (GPU._curline + GPU._yscrl) & 7;
              let x = GPU._xscrl & 7;
              let t = (GPU._xscrl >> 3) & 0x1F;
              let pixel;
              let w = WIDTH;

              if (GPU._bgtilebase) {
                let tile = _vram[mapbase + t];
                if (tile < 0x80) tile = 0x100 + tile;
                let tilerow = _tileSet[tile][y];
                do {
                  GPU._scanrow[WIDTH - x] = tilerow[x];
                  _imageData.data[linebase] = _palette.bg[tilerow[x]];
                  x++;
                  if (x == 8) {
                    t = (t + 1) & 0x1F;
                    x = 0;
                    tile = _vram[mapbase + t];
                    if (tile < 0x80) tile = 0x100 + tile;
                    tilerow = _tileSet[tile][y];
                  }
                  linebase += 4;
                } while (--w);
              } else {
                let tilerow = _tileSet[_vram[mapbase + t]][y];
                do {
                  GPU._scanrow[WIDTH - x] = tilerow[x];
                  _imageData.data[linebase] = _palette.bg[tilerow[x]];
                  _imageData.data[linebase+1] = _palette.bg[tilerow[x]];
                  _imageData.data[linebase+2] = _palette.bg[tilerow[x]];
                  x++;
                  if (x == 8) {
                    t = (t + 1) & 0x1F;
                    x = 0;
                    tilerow = _tileSet[_vram[mapbase + t]][y];
                  }
                  linebase += 4;
                } while (--w);
              }
            }
            if (GPU._objon) {
              let cnt = 0;
              if (!GPU._objsize) {
                let tilerow;
                let obj;
                let pal;
                let pixel;
                let x;
                let linebase = GPU._curscan;
                for (let i = 0; i < 40; i++) {
                  obj = GPU._objdatasorted[i];
                  if (obj.y <= GPU._curline && (obj.y + 8) > GPU._curline) {
                    if (obj.yflip)
                      tilerow = _tileSet[obj.tile][7 - (GPU._curline - obj.y)];
                    else
                      tilerow = _tileSet[obj.tile][GPU._curline - obj.y];

                    if (obj.palette) pal = _palette.obj1;
                    else pal = _palette.obj0;

                    linebase = (GPU._curline * WIDTH + obj.x) << 2;
                    if (obj.xflip) {
                      for (x = 0; x < 8; x++) {
                        if (obj.x + x >= 0 && obj.x + x < WIDTH) {
                          if (tilerow[7 - x] && (obj.prio || !GPU._scanrow[x])) {
                            _imageData.data[linebase] = pal[tilerow[7 - x]];
                          }
                        }
                        linebase += 4;
                      }
                    } else {
                      for (x = 0; x < 8; x++) {
                        if (obj.x + x >= 0 && obj.x + x < WIDTH) {
                          if (tilerow[x] && (obj.prio || !GPU._scanrow[x])) {
                            _imageData.data[linebase] = pal[tilerow[x]];
                          }
                        }
                        linebase += 4;
                      }
                    }
                    cnt++;
                    if (cnt > 10) break;
                  }
                }
              }
            }
          }
          */
        }
        break;
    }
  },

  updateTile(addr, val) {
    /** Round down to even-byte extents, since GBs store a pixel colour's low bit
     * and high bit across 2 bytes. e.g.
     * BYTE0: 00101100
     * BYTE1: 10100100
     * Actually represents 8 pixels: [10, 00, 11, 00, 01, 11, 00, 00]
     * Since it's 2-bits, the palette is 4 colours.
     */
    var saddr = addr & 0xFFFE;

    // Each tile is 16 bytes (2 bytes => 8 pixels)
    var tile = (saddr >> 4) & 0x01FF;

    // Lookup which row of the tile this address refers to
    var y = (saddr >> 1) & 7;
    var sx;

    // Grab the subarray for the line we're updating
    // ImageData is 4 bytes per pixel, so each line is 4 bytes * 8 pixels / line * line
    var line = _tileSet[tile].data.subarray(y << 5, 1 + y << 5);

    // X is cartesian, sx is the bit offset to mask
    for (let x = 0, sx = 0x80; x < 32; x += 4, sx = sx >> 1) {
      // Grab the grey by mapping 0-3, taken from 2 bits in vram, to our palette
      let grey = _greys[((_vram[saddr] & sx) ? 1 : 0) | ((_vram[saddr + 1] & sx) ? 2 : 0)];
      line[x] = grey;
      line[x + 1] = grey;
      line[x + 2] = grey;
      line[x + 3] = 0xFF;
    }
  },

  updateoam(addr, val) {
    addr -= 0xFE00;
    var obj = addr >> 2;
    if (obj < 40) {
      switch (addr & 3) {
        case 0:
          GPU._objdata[obj].y = val - 16;
          break;
        case 1:
          GPU._objdata[obj].x = val - 8;
          break;
        case 2:
          if (GPU._objsize) GPU._objdata[obj].tile = (val & 0xFE);
          else GPU._objdata[obj].tile = val;
          break;
        case 3:
          GPU._objdata[obj].palette = (val & 0x10) ? 1 : 0;
          GPU._objdata[obj].xflip = (val & 0x20) ? 1 : 0;
          GPU._objdata[obj].yflip = (val & 0x40) ? 1 : 0;
          GPU._objdata[obj].prio = (val & 0x80) ? 1 : 0;
          break;
      }
    }
    GPU._objdatasorted = GPU._objdata;
    GPU._objdatasorted.sort(function(a, b) {
      if (a.x > b.x) return -1;
      if (a.num > b.num) return -1;
    });
  },

  rb(addr) {
    var gaddr = addr - 0xFF40;
    switch (gaddr) {
      case 0:
        return (GPU._lcdon ? 0x80 : 0) |
          ((GPU._bgtilebase == 0x0000) ? 0x10 : 0) |
          ((GPU._bgmapbase == 0x1C00) ? 0x08 : 0) |
          (GPU._objsize ? 0x04 : 0) |
          (GPU._objon ? 0x02 : 0) |
          (GPU._bgon ? 0x01 : 0);

      case 1:
        return (GPU._curline == GPU._raster ? 4 : 0) | GPU._linemode;

      case 2:
        return _yscrl;

      case 3:
        return _xscrl;

      case 4:
        return GPU._curline;

      case 5:
        return GPU._raster;

      default:
        return GPU._reg[gaddr];
    }
  },

  wb(addr, val) {
    var gaddr = addr - 0xFF40;
    GPU._reg[gaddr] = val;
    switch (gaddr) {
      case 0:
        GPU._lcdon = (val & 0x80) ? 1 : 0;
        GPU._bgtilebase = (val & 0x10) ? 0x0000 : 0x0800;
        GPU._bgmapbase = (val & 0x08) ? 0x1C00 : 0x1800;
        GPU._objsize = (val & 0x04) ? 1 : 0;
        GPU._objon = (val & 0x02) ? 1 : 0;
        GPU._bgon = (val & 0x01) ? 1 : 0;
        break;

      case 2:
        _yscrl = val;
        break;

      case 3:
        _xscrl = val;
        break;

      case 5:
        GPU._raster = val;
        break;

      // OAM DMA
      case 6:
        let v;
        for (let i = 0; i < WIDTH; i++) {
          v = MMU.rb((val << 8) + i);
          GPU._oam[i] = v;
          GPU.updateoam(0xFE00 + i, v);
        }
        break;

        // BG palette mapping
      case 7:
        break;

        // OBJ0 palette mapping
      case 8:
        break;

        // OBJ1 palette mapping
      case 9:
        break;
    }
  }
};

export default GPU;
