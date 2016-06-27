/**
 * The bounds for the areas of the Header
 * Offset from the start of header, not memory address, e.g. 0x04 would actually be 0x0104
 */
const bounds = {
  entry: [0x00, 0x04],
  logo: [0x04, 0x34],
  title: [0x34, 0x44],
  publisher: [0x44, 0x46],
  superGameBoy: [0x46, 0x47],
  type: [0x47, 0x48],
  romSize: [0x48, 0x49],
  ramSize: [0x49, 0x4A],
  destination: [0x4A, 0x4B],
  publisherOld: [0x4B, 0x4C],
  romVersion: [0x4C, 0x4D],
  headerChecksum: [0x4D, 0x4E],
  globalChecksum: [0x4E, 0x50],
};

export const getTitle = header => String.fromCharCode(...header.subarray(...bounds.logo));
export const isSGB = header => !!header[bounds.superGameBoy[0]];
export const getRomSize = header => header[bounds.romSize[0]];
export const getRamSize = header => header[bounds.ramSize[0]];
export const getDestination = header => header[bounds.destination[0]] === 1 ? 'Japan' : 'International';
// TODO: align this as new publisher is two-bytes
export const getPublisher = header => header[bounds.publisher[0]] || header[bounds.publisherOld[0]];
export const getRomVersion = header => header[bounds.romVersion[0]];

export default header => ({
  title: getTitle(header),
  superGameBoy: isSGB(header),
  romSize: getRomSize(header),
  ramSize: getRamSize(header),
  destination: getDestination(header),
  publisher: getPublisher(header),
  version: getRomVersion(header),
});
