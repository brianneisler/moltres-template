import isBoolean from './isBoolean'

describe('isBoolean', () => {
  test('returns true for plain booleans', () => {
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(true)).toBe(true)
  })

  test('returns true for native Boolean objects', () => {
    expect(isBoolean(new Boolean(false))).toBe(true)
    expect(isBoolean(new Boolean(true))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean('')).toBe(false)
    expect(isBoolean('abc')).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(-1)).toBe(false)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(NaN)).toBe(false)
    expect(isBoolean(Infinity)).toBe(false)
    expect(isBoolean(-Infinity)).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean([])).toBe(false)
    expect(isBoolean(/abc/)).toBe(false)
    expect(isBoolean(async () => {})).toBe(false)
    expect(isBoolean(() => {})).toBe(false)
    expect(isBoolean(function() {})).toBe(false)
    expect(isBoolean((function*() {})())).toBe(false)
    expect(isBoolean(new Array(0))).toBe(false)
    expect(isBoolean(new ArrayBuffer(2))).toBe(false)
    expect(isBoolean(new Date())).toBe(false)
    expect(isBoolean(new Error())).toBe(false)
    expect(isBoolean(new Number(1))).toBe(false)
    expect(isBoolean(new Promise(() => {}))).toBe(false)
    expect(isBoolean(new Proxy({}, {}))).toBe(false)
    expect(isBoolean(new Set())).toBe(false)
    expect(isBoolean(new String('abc'))).toBe(false)
    expect(isBoolean(Symbol('abc'))).toBe(false)
    expect(isBoolean(new WeakMap())).toBe(false)
    expect(isBoolean(new WeakSet())).toBe(false)
  })
})
