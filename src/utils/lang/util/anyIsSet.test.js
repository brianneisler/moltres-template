describe('anyIsSet', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of Set', () => {
    const anyIsSet = require('./anyIsSet').default
    expect(anyIsSet(new Set())).toBe(true)
  })

  test('returns false for all other values', () => {
    const anyIsSet = require('./anyIsSet').default
    expect(anyIsSet(undefined)).toBe(false)
    expect(anyIsSet(null)).toBe(false)
    expect(anyIsSet('')).toBe(false)
    expect(anyIsSet('abc')).toBe(false)
    expect(anyIsSet(false)).toBe(false)
    expect(anyIsSet(true)).toBe(false)
    expect(anyIsSet(0)).toBe(false)
    expect(anyIsSet(-1)).toBe(false)
    expect(anyIsSet(1)).toBe(false)
    expect(anyIsSet(NaN)).toBe(false)
    expect(anyIsSet(Infinity)).toBe(false)
    expect(anyIsSet(-Infinity)).toBe(false)
    expect(anyIsSet({})).toBe(false)
    expect(anyIsSet([])).toBe(false)
    expect(anyIsSet(/abc/)).toBe(false)
    expect(anyIsSet(new RegExp('abc'))).toBe(false)
    expect(anyIsSet(async () => {})).toBe(false)
    expect(anyIsSet(() => {})).toBe(false)
    expect(anyIsSet(function () {})).toBe(false)
    expect(anyIsSet(function* () {})).toBe(false)
    expect(anyIsSet((function* () {})())).toBe(false)
    expect(anyIsSet(new Array(0))).toBe(false)
    expect(anyIsSet(new ArrayBuffer(2))).toBe(false)
    expect(anyIsSet(new Boolean(false))).toBe(false)
    expect(anyIsSet(new Boolean(true))).toBe(false)
    expect(anyIsSet(new Date())).toBe(false)
    expect(anyIsSet(new Error())).toBe(false)
    expect(anyIsSet(new Number(1))).toBe(false)
    expect(anyIsSet(new Promise(() => {}))).toBe(false)
    expect(anyIsSet(new Proxy({}, {}))).toBe(false)
    expect(anyIsSet(new String('abc'))).toBe(false)
    expect(anyIsSet(Symbol('abc'))).toBe(false)
    expect(anyIsSet(new WeakMap())).toBe(false)
    expect(anyIsSet(new WeakSet())).toBe(false)
  })

  test('returns true for instances of Set using non node anyIsSet method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsSet: undefined
    }))
    const anyIsSet = require('./anyIsSet').default
    expect(anyIsSet(new Set())).toBe(true)
  })

  test('returns false for all other values using non node anyIsSet method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsSet: undefined
    }))
    const anyIsSet = require('./anyIsSet').default
    expect(anyIsSet(undefined)).toBe(false)
    expect(anyIsSet(null)).toBe(false)
    expect(anyIsSet('')).toBe(false)
    expect(anyIsSet('abc')).toBe(false)
    expect(anyIsSet(false)).toBe(false)
    expect(anyIsSet(true)).toBe(false)
    expect(anyIsSet(0)).toBe(false)
    expect(anyIsSet(-1)).toBe(false)
    expect(anyIsSet(1)).toBe(false)
    expect(anyIsSet(NaN)).toBe(false)
    expect(anyIsSet(Infinity)).toBe(false)
    expect(anyIsSet(-Infinity)).toBe(false)
    expect(anyIsSet({})).toBe(false)
    expect(anyIsSet([])).toBe(false)
    expect(anyIsSet(/abc/)).toBe(false)
    expect(anyIsSet(new RegExp('abc'))).toBe(false)
    expect(anyIsSet(async () => {})).toBe(false)
    expect(anyIsSet(() => {})).toBe(false)
    expect(anyIsSet(function () {})).toBe(false)
    expect(anyIsSet(function* () {})).toBe(false)
    expect(anyIsSet((function* () {})())).toBe(false)
    expect(anyIsSet(new Array(0))).toBe(false)
    expect(anyIsSet(new ArrayBuffer(2))).toBe(false)
    expect(anyIsSet(new Boolean(false))).toBe(false)
    expect(anyIsSet(new Boolean(true))).toBe(false)
    expect(anyIsSet(new Date())).toBe(false)
    expect(anyIsSet(new Error())).toBe(false)
    expect(anyIsSet(new Number(1))).toBe(false)
    expect(anyIsSet(new Promise(() => {}))).toBe(false)
    expect(anyIsSet(new Proxy({}, {}))).toBe(false)
    expect(anyIsSet(new String('abc'))).toBe(false)
    expect(anyIsSet(Symbol('abc'))).toBe(false)
    expect(anyIsSet(new WeakMap())).toBe(false)
    expect(anyIsSet(new WeakSet())).toBe(false)
  })
})
