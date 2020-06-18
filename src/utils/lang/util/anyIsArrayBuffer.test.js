describe('anyIsArrayBuffer', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instance of ArrayBuffer', () => {
    const anyIsArrayBuffer = require('./anyIsArrayBuffer').default
    expect(anyIsArrayBuffer(new ArrayBuffer(2))).toBe(true)
  })

  test('returns false for all other values', () => {
    const anyIsArrayBuffer = require('./anyIsArrayBuffer').default
    expect(anyIsArrayBuffer(undefined)).toBe(false)
    expect(anyIsArrayBuffer(null)).toBe(false)
    expect(anyIsArrayBuffer('')).toBe(false)
    expect(anyIsArrayBuffer('abc')).toBe(false)
    expect(anyIsArrayBuffer(false)).toBe(false)
    expect(anyIsArrayBuffer(true)).toBe(false)
    expect(anyIsArrayBuffer(0)).toBe(false)
    expect(anyIsArrayBuffer(-1)).toBe(false)
    expect(anyIsArrayBuffer(1)).toBe(false)
    expect(anyIsArrayBuffer(NaN)).toBe(false)
    expect(anyIsArrayBuffer(Infinity)).toBe(false)
    expect(anyIsArrayBuffer(-Infinity)).toBe(false)
    expect(anyIsArrayBuffer({})).toBe(false)
    expect(anyIsArrayBuffer([])).toBe(false)
    expect(anyIsArrayBuffer(/abc/)).toBe(false)
    expect(anyIsArrayBuffer(async () => {})).toBe(false)
    expect(anyIsArrayBuffer(() => {})).toBe(false)
    expect(anyIsArrayBuffer(function () {})).toBe(false)
    expect(anyIsArrayBuffer((function* () {})())).toBe(false)
    expect(anyIsArrayBuffer(new Array(0))).toBe(false)
    expect(anyIsArrayBuffer(new Boolean(false))).toBe(false)
    expect(anyIsArrayBuffer(new Boolean(true))).toBe(false)
    expect(anyIsArrayBuffer(new Date())).toBe(false)
    expect(anyIsArrayBuffer(new Error())).toBe(false)
    expect(anyIsArrayBuffer(new Number(1))).toBe(false)
    expect(anyIsArrayBuffer(new Promise(() => {}))).toBe(false)
    expect(anyIsArrayBuffer(new Proxy({}, {}))).toBe(false)
    expect(anyIsArrayBuffer(new Set())).toBe(false)
    expect(anyIsArrayBuffer(new String('abc'))).toBe(false)
    expect(anyIsArrayBuffer(Symbol('abc'))).toBe(false)
    expect(anyIsArrayBuffer(new WeakMap())).toBe(false)
    expect(anyIsArrayBuffer(new WeakSet())).toBe(false)
  })

  test('returns true for instance of ArrayBuffer using non node anyIsArrayBuffer method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsArrayBuffer: undefined
    }))
    const anyIsArrayBuffer = require('./anyIsArrayBuffer').default
    expect(anyIsArrayBuffer(new ArrayBuffer(2))).toBe(true)
  })

  test('returns false for all other values using non node anyIsArrayBuffer method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsArrayBuffer: undefined
    }))
    const anyIsArrayBuffer = require('./anyIsArrayBuffer').default
    expect(anyIsArrayBuffer(undefined)).toBe(false)
    expect(anyIsArrayBuffer(null)).toBe(false)
    expect(anyIsArrayBuffer('')).toBe(false)
    expect(anyIsArrayBuffer('abc')).toBe(false)
    expect(anyIsArrayBuffer(false)).toBe(false)
    expect(anyIsArrayBuffer(true)).toBe(false)
    expect(anyIsArrayBuffer(0)).toBe(false)
    expect(anyIsArrayBuffer(-1)).toBe(false)
    expect(anyIsArrayBuffer(1)).toBe(false)
    expect(anyIsArrayBuffer(NaN)).toBe(false)
    expect(anyIsArrayBuffer(Infinity)).toBe(false)
    expect(anyIsArrayBuffer(-Infinity)).toBe(false)
    expect(anyIsArrayBuffer({})).toBe(false)
    expect(anyIsArrayBuffer([])).toBe(false)
    expect(anyIsArrayBuffer(/abc/)).toBe(false)
    expect(anyIsArrayBuffer(async () => {})).toBe(false)
    expect(anyIsArrayBuffer(() => {})).toBe(false)
    expect(anyIsArrayBuffer(function () {})).toBe(false)
    expect(anyIsArrayBuffer((function* () {})())).toBe(false)
    expect(anyIsArrayBuffer(new Array(0))).toBe(false)
    expect(anyIsArrayBuffer(new Boolean(false))).toBe(false)
    expect(anyIsArrayBuffer(new Boolean(true))).toBe(false)
    expect(anyIsArrayBuffer(new Date())).toBe(false)
    expect(anyIsArrayBuffer(new Error())).toBe(false)
    expect(anyIsArrayBuffer(new Number(1))).toBe(false)
    expect(anyIsArrayBuffer(new Promise(() => {}))).toBe(false)
    expect(anyIsArrayBuffer(new Proxy({}, {}))).toBe(false)
    expect(anyIsArrayBuffer(new Set())).toBe(false)
    expect(anyIsArrayBuffer(new String('abc'))).toBe(false)
    expect(anyIsArrayBuffer(Symbol('abc'))).toBe(false)
    expect(anyIsArrayBuffer(new WeakMap())).toBe(false)
    expect(anyIsArrayBuffer(new WeakSet())).toBe(false)
  })
})
