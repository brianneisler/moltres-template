import { Buffer } from 'buffer'

import root from '../util/root'

/** Detect free variable `exports`. */
const freeExports =
  typeof exports == 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule =
  freeExports &&
  typeof module == 'object' &&
  module !== null &&
  !module.nodeType &&
  module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
const ExportBuffer = moduleExports ? root.Buffer : Buffer

export default ExportBuffer
