import {
  ArrayBuffer,
  Buffer,
  Date,
  Map,
  Promise,
  Proxy,
  Set,
  WeakMap,
  WeakSet
} from '../../../src/utils/data/js'

const values = [
  new ArrayBuffer(2),
  new Buffer([]),
  new Date(),
  new Map(),
  new Promise(() => {}),
  new Proxy({}, {}),
  new Set(),
  new WeakMap(),
  new WeakSet()
]

const nativeJsClasses = () => values

export default nativeJsClasses
