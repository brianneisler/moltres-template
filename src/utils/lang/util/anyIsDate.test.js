describe('anyIsDate', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of Date', () => {
    const anyIsDate = require('./anyIsDate').default
    expect(anyIsDate(new Date())).toBe(true)
  })

  test('returns false for all other values', () => {
    const anyIsDate = require('./anyIsDate').default
    expect(anyIsDate(undefined)).toBe(false)
    expect(anyIsDate(null)).toBe(false)
    expect(anyIsDate('')).toBe(false)
    expect(anyIsDate('abc')).toBe(false)
    expect(anyIsDate(false)).toBe(false)
    expect(anyIsDate(true)).toBe(false)
    expect(anyIsDate(0)).toBe(false)
    expect(anyIsDate(-1)).toBe(false)
    expect(anyIsDate(1)).toBe(false)
    expect(anyIsDate(NaN)).toBe(false)
    expect(anyIsDate(Infinity)).toBe(false)
    expect(anyIsDate(-Infinity)).toBe(false)
    expect(anyIsDate({})).toBe(false)
    expect(anyIsDate([])).toBe(false)
    expect(anyIsDate(/abc/)).toBe(false)
    expect(anyIsDate(async () => {})).toBe(false)
    expect(anyIsDate(() => {})).toBe(false)
    expect(anyIsDate(function () {})).toBe(false)
    expect(anyIsDate((function* () {})())).toBe(false)
    expect(anyIsDate(new Array(0))).toBe(false)
    expect(anyIsDate(new ArrayBuffer(2))).toBe(false)
    expect(anyIsDate(new Boolean(false))).toBe(false)
    expect(anyIsDate(new Boolean(true))).toBe(false)
    expect(anyIsDate(new Error())).toBe(false)
    expect(anyIsDate(new Number(1))).toBe(false)
    expect(anyIsDate(new Promise(() => {}))).toBe(false)
    expect(anyIsDate(new Proxy({}, {}))).toBe(false)
    expect(anyIsDate(new Set())).toBe(false)
    expect(anyIsDate(new String('abc'))).toBe(false)
    expect(anyIsDate(Symbol('abc'))).toBe(false)
    expect(anyIsDate(new WeakMap())).toBe(false)
    expect(anyIsDate(new WeakSet())).toBe(false)
  })

  test('returns true for instances of Date using non node anyIsDate method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsDate: undefined
    }))
    const anyIsDate = require('./anyIsDate').default
    expect(anyIsDate(new Date())).toBe(true)
  })

  test('returns false for all other values using non node anyIsDate method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      anyIsDate: undefined
    }))
    const anyIsDate = require('./anyIsDate').default
    expect(anyIsDate(undefined)).toBe(false)
    expect(anyIsDate(null)).toBe(false)
    expect(anyIsDate('')).toBe(false)
    expect(anyIsDate('abc')).toBe(false)
    expect(anyIsDate(false)).toBe(false)
    expect(anyIsDate(true)).toBe(false)
    expect(anyIsDate(0)).toBe(false)
    expect(anyIsDate(-1)).toBe(false)
    expect(anyIsDate(1)).toBe(false)
    expect(anyIsDate(NaN)).toBe(false)
    expect(anyIsDate(Infinity)).toBe(false)
    expect(anyIsDate(-Infinity)).toBe(false)
    expect(anyIsDate({})).toBe(false)
    expect(anyIsDate([])).toBe(false)
    expect(anyIsDate(/abc/)).toBe(false)
    expect(anyIsDate(async () => {})).toBe(false)
    expect(anyIsDate(() => {})).toBe(false)
    expect(anyIsDate(function () {})).toBe(false)
    expect(anyIsDate((function* () {})())).toBe(false)
    expect(anyIsDate(new Array(0))).toBe(false)
    expect(anyIsDate(new ArrayBuffer(2))).toBe(false)
    expect(anyIsDate(new Boolean(false))).toBe(false)
    expect(anyIsDate(new Boolean(true))).toBe(false)
    expect(anyIsDate(new Error())).toBe(false)
    expect(anyIsDate(new Number(1))).toBe(false)
    expect(anyIsDate(new Promise(() => {}))).toBe(false)
    expect(anyIsDate(new Proxy({}, {}))).toBe(false)
    expect(anyIsDate(new Set())).toBe(false)
    expect(anyIsDate(new String('abc'))).toBe(false)
    expect(anyIsDate(Symbol('abc'))).toBe(false)
    expect(anyIsDate(new WeakMap())).toBe(false)
    expect(anyIsDate(new WeakSet())).toBe(false)
  })
})
