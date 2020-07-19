describe('anyIsRegExp', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of RegExp', () => {
    const anyIsRegExp = require('./anyIsRegExp').default
    expect(anyIsRegExp(/abc/)).toBe(true)
    expect(anyIsRegExp(new RegExp('abc'))).toBe(true)
  })

  test('returns false for all other values', () => {
    const anyIsRegExp = require('./anyIsRegExp').default
    expect(anyIsRegExp(undefined)).toBe(false)
    expect(anyIsRegExp(null)).toBe(false)
    expect(anyIsRegExp('')).toBe(false)
    expect(anyIsRegExp('abc')).toBe(false)
    expect(anyIsRegExp(false)).toBe(false)
    expect(anyIsRegExp(true)).toBe(false)
    expect(anyIsRegExp(0)).toBe(false)
    expect(anyIsRegExp(-1)).toBe(false)
    expect(anyIsRegExp(1)).toBe(false)
    expect(anyIsRegExp(NaN)).toBe(false)
    expect(anyIsRegExp(Infinity)).toBe(false)
    expect(anyIsRegExp(-Infinity)).toBe(false)
    expect(anyIsRegExp({})).toBe(false)
    expect(anyIsRegExp([])).toBe(false)
    expect(anyIsRegExp(async () => {})).toBe(false)
    expect(anyIsRegExp(() => {})).toBe(false)
    expect(anyIsRegExp(function () {})).toBe(false)
    expect(anyIsRegExp(function* () {})).toBe(false)
    expect(anyIsRegExp((function* () {})())).toBe(false)
    expect(anyIsRegExp(new Array(0))).toBe(false)
    expect(anyIsRegExp(new ArrayBuffer(2))).toBe(false)
    expect(anyIsRegExp(new Boolean(false))).toBe(false)
    expect(anyIsRegExp(new Boolean(true))).toBe(false)
    expect(anyIsRegExp(new Date())).toBe(false)
    expect(anyIsRegExp(new Error())).toBe(false)
    expect(anyIsRegExp(new Number(1))).toBe(false)
    expect(anyIsRegExp(new Promise(() => {}))).toBe(false)
    expect(anyIsRegExp(new Proxy({}, {}))).toBe(false)
    expect(anyIsRegExp(new Set())).toBe(false)
    expect(anyIsRegExp(new String('abc'))).toBe(false)
    expect(anyIsRegExp(Symbol('abc'))).toBe(false)
    expect(anyIsRegExp(new WeakMap())).toBe(false)
    expect(anyIsRegExp(new WeakSet())).toBe(false)
  })

  test('returns true for instances of RegExp using non node anyIsRegExp method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsRegExp: undefined
    }))
    const anyIsRegExp = require('./anyIsRegExp').default
    expect(anyIsRegExp(/abc/)).toBe(true)
    expect(anyIsRegExp(new RegExp('abc'))).toBe(true)
  })

  test('returns false for all other values using non node anyIsRegExp method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsRegExp: undefined
    }))
    const anyIsRegExp = require('./anyIsRegExp').default
    expect(anyIsRegExp(undefined)).toBe(false)
    expect(anyIsRegExp(null)).toBe(false)
    expect(anyIsRegExp('')).toBe(false)
    expect(anyIsRegExp('abc')).toBe(false)
    expect(anyIsRegExp(false)).toBe(false)
    expect(anyIsRegExp(true)).toBe(false)
    expect(anyIsRegExp(0)).toBe(false)
    expect(anyIsRegExp(-1)).toBe(false)
    expect(anyIsRegExp(1)).toBe(false)
    expect(anyIsRegExp(NaN)).toBe(false)
    expect(anyIsRegExp(Infinity)).toBe(false)
    expect(anyIsRegExp(-Infinity)).toBe(false)
    expect(anyIsRegExp({})).toBe(false)
    expect(anyIsRegExp([])).toBe(false)
    expect(anyIsRegExp(async () => {})).toBe(false)
    expect(anyIsRegExp(() => {})).toBe(false)
    expect(anyIsRegExp(function () {})).toBe(false)
    expect(anyIsRegExp(function* () {})).toBe(false)
    expect(anyIsRegExp((function* () {})())).toBe(false)
    expect(anyIsRegExp(new Array(0))).toBe(false)
    expect(anyIsRegExp(new ArrayBuffer(2))).toBe(false)
    expect(anyIsRegExp(new Boolean(false))).toBe(false)
    expect(anyIsRegExp(new Boolean(true))).toBe(false)
    expect(anyIsRegExp(new Date())).toBe(false)
    expect(anyIsRegExp(new Error())).toBe(false)
    expect(anyIsRegExp(new Number(1))).toBe(false)
    expect(anyIsRegExp(new Promise(() => {}))).toBe(false)
    expect(anyIsRegExp(new Proxy({}, {}))).toBe(false)
    expect(anyIsRegExp(new Set())).toBe(false)
    expect(anyIsRegExp(new String('abc'))).toBe(false)
    expect(anyIsRegExp(Symbol('abc'))).toBe(false)
    expect(anyIsRegExp(new WeakMap())).toBe(false)
    expect(anyIsRegExp(new WeakSet())).toBe(false)
  })
})
