describe('anyIsMap', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of Map', () => {
    const anyIsMap = require('./anyIsMap').default
    expect(anyIsMap(new Map())).toBe(true)
  })

  test('returns false for all other values', () => {
    const anyIsMap = require('./anyIsMap').default
    expect(anyIsMap(undefined)).toBe(false)
    expect(anyIsMap(null)).toBe(false)
    expect(anyIsMap('')).toBe(false)
    expect(anyIsMap('abc')).toBe(false)
    expect(anyIsMap(false)).toBe(false)
    expect(anyIsMap(true)).toBe(false)
    expect(anyIsMap(0)).toBe(false)
    expect(anyIsMap(-1)).toBe(false)
    expect(anyIsMap(1)).toBe(false)
    expect(anyIsMap(NaN)).toBe(false)
    expect(anyIsMap(Infinity)).toBe(false)
    expect(anyIsMap(-Infinity)).toBe(false)
    expect(anyIsMap({})).toBe(false)
    expect(anyIsMap([])).toBe(false)
    expect(anyIsMap(/abc/)).toBe(false)
    expect(anyIsMap(new RegExp('abc'))).toBe(false)
    expect(anyIsMap(async () => {})).toBe(false)
    expect(anyIsMap(() => {})).toBe(false)
    expect(anyIsMap(function () {})).toBe(false)
    expect(anyIsMap(function* () {})).toBe(false)
    expect(anyIsMap((function* () {})())).toBe(false)
    expect(anyIsMap(new Array(0))).toBe(false)
    expect(anyIsMap(new ArrayBuffer(2))).toBe(false)
    expect(anyIsMap(new Boolean(false))).toBe(false)
    expect(anyIsMap(new Boolean(true))).toBe(false)
    expect(anyIsMap(new Date())).toBe(false)
    expect(anyIsMap(new Error())).toBe(false)
    expect(anyIsMap(new Number(1))).toBe(false)
    expect(anyIsMap(new Promise(() => {}))).toBe(false)
    expect(anyIsMap(new Proxy({}, {}))).toBe(false)
    expect(anyIsMap(new Set())).toBe(false)
    expect(anyIsMap(new String('abc'))).toBe(false)
    expect(anyIsMap(Symbol('abc'))).toBe(false)
    expect(anyIsMap(new WeakMap())).toBe(false)
    expect(anyIsMap(new WeakSet())).toBe(false)
  })

  test('returns true for instances of Map using non node anyIsMap method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsMap: undefined
    }))
    const anyIsMap = require('./anyIsMap').default
    expect(anyIsMap(new Map())).toBe(true)
  })

  test('returns false for all other values using non node anyIsMap method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsMap: undefined
    }))
    const anyIsMap = require('./anyIsMap').default
    expect(anyIsMap(undefined)).toBe(false)
    expect(anyIsMap(null)).toBe(false)
    expect(anyIsMap('')).toBe(false)
    expect(anyIsMap('abc')).toBe(false)
    expect(anyIsMap(false)).toBe(false)
    expect(anyIsMap(true)).toBe(false)
    expect(anyIsMap(0)).toBe(false)
    expect(anyIsMap(-1)).toBe(false)
    expect(anyIsMap(1)).toBe(false)
    expect(anyIsMap(NaN)).toBe(false)
    expect(anyIsMap(Infinity)).toBe(false)
    expect(anyIsMap(-Infinity)).toBe(false)
    expect(anyIsMap({})).toBe(false)
    expect(anyIsMap([])).toBe(false)
    expect(anyIsMap(/abc/)).toBe(false)
    expect(anyIsMap(new RegExp('abc'))).toBe(false)
    expect(anyIsMap(async () => {})).toBe(false)
    expect(anyIsMap(() => {})).toBe(false)
    expect(anyIsMap(function () {})).toBe(false)
    expect(anyIsMap(function* () {})).toBe(false)
    expect(anyIsMap((function* () {})())).toBe(false)
    expect(anyIsMap(new Array(0))).toBe(false)
    expect(anyIsMap(new ArrayBuffer(2))).toBe(false)
    expect(anyIsMap(new Boolean(false))).toBe(false)
    expect(anyIsMap(new Boolean(true))).toBe(false)
    expect(anyIsMap(new Date())).toBe(false)
    expect(anyIsMap(new Error())).toBe(false)
    expect(anyIsMap(new Number(1))).toBe(false)
    expect(anyIsMap(new Promise(() => {}))).toBe(false)
    expect(anyIsMap(new Proxy({}, {}))).toBe(false)
    expect(anyIsMap(new Set())).toBe(false)
    expect(anyIsMap(new String('abc'))).toBe(false)
    expect(anyIsMap(Symbol('abc'))).toBe(false)
    expect(anyIsMap(new WeakMap())).toBe(false)
    expect(anyIsMap(new WeakSet())).toBe(false)
  })
})
