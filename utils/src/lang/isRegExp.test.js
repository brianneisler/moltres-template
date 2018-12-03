describe('isRegExp', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of RegExp', () => {
    const isRegExp = require('./isRegExp').default
    expect(isRegExp(/abc/)).toBe(true)
    expect(isRegExp(new RegExp('abc'))).toBe(true)
  })

  test('returns false for all other values', () => {
    const isRegExp = require('./isRegExp').default
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp('')).toBe(false)
    expect(isRegExp('abc')).toBe(false)
    expect(isRegExp(false)).toBe(false)
    expect(isRegExp(true)).toBe(false)
    expect(isRegExp(0)).toBe(false)
    expect(isRegExp(-1)).toBe(false)
    expect(isRegExp(1)).toBe(false)
    expect(isRegExp(NaN)).toBe(false)
    expect(isRegExp(Infinity)).toBe(false)
    expect(isRegExp(-Infinity)).toBe(false)
    expect(isRegExp({})).toBe(false)
    expect(isRegExp([])).toBe(false)
    expect(isRegExp(async () => {})).toBe(false)
    expect(isRegExp(() => {})).toBe(false)
    expect(isRegExp(function() {})).toBe(false)
    expect(isRegExp(function*() {})).toBe(false)
    expect(isRegExp((function*() {})())).toBe(false)
    expect(isRegExp(new Array(0))).toBe(false)
    expect(isRegExp(new ArrayBuffer(2))).toBe(false)
    expect(isRegExp(new Boolean(false))).toBe(false)
    expect(isRegExp(new Boolean(true))).toBe(false)
    expect(isRegExp(new Date())).toBe(false)
    expect(isRegExp(new Error())).toBe(false)
    expect(isRegExp(new Number(1))).toBe(false)
    expect(isRegExp(new Promise(() => {}))).toBe(false)
    expect(isRegExp(new Proxy({}, {}))).toBe(false)
    expect(isRegExp(new Set())).toBe(false)
    expect(isRegExp(new String('abc'))).toBe(false)
    expect(isRegExp(Symbol('abc'))).toBe(false)
    expect(isRegExp(new WeakMap())).toBe(false)
    expect(isRegExp(new WeakSet())).toBe(false)
  })

  test('returns true for instances of RegExp using non node isRegExp method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isRegExp: undefined
    }))
    const isRegExp = require('./isRegExp').default
    expect(isRegExp(/abc/)).toBe(true)
    expect(isRegExp(new RegExp('abc'))).toBe(true)
  })

  test('returns false for all other values using non node isRegExp method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isRegExp: undefined
    }))
    const isRegExp = require('./isRegExp').default
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp('')).toBe(false)
    expect(isRegExp('abc')).toBe(false)
    expect(isRegExp(false)).toBe(false)
    expect(isRegExp(true)).toBe(false)
    expect(isRegExp(0)).toBe(false)
    expect(isRegExp(-1)).toBe(false)
    expect(isRegExp(1)).toBe(false)
    expect(isRegExp(NaN)).toBe(false)
    expect(isRegExp(Infinity)).toBe(false)
    expect(isRegExp(-Infinity)).toBe(false)
    expect(isRegExp({})).toBe(false)
    expect(isRegExp([])).toBe(false)
    expect(isRegExp(async () => {})).toBe(false)
    expect(isRegExp(() => {})).toBe(false)
    expect(isRegExp(function() {})).toBe(false)
    expect(isRegExp(function*() {})).toBe(false)
    expect(isRegExp((function*() {})())).toBe(false)
    expect(isRegExp(new Array(0))).toBe(false)
    expect(isRegExp(new ArrayBuffer(2))).toBe(false)
    expect(isRegExp(new Boolean(false))).toBe(false)
    expect(isRegExp(new Boolean(true))).toBe(false)
    expect(isRegExp(new Date())).toBe(false)
    expect(isRegExp(new Error())).toBe(false)
    expect(isRegExp(new Number(1))).toBe(false)
    expect(isRegExp(new Promise(() => {}))).toBe(false)
    expect(isRegExp(new Proxy({}, {}))).toBe(false)
    expect(isRegExp(new Set())).toBe(false)
    expect(isRegExp(new String('abc'))).toBe(false)
    expect(isRegExp(Symbol('abc'))).toBe(false)
    expect(isRegExp(new WeakMap())).toBe(false)
    expect(isRegExp(new WeakSet())).toBe(false)
  })
})
