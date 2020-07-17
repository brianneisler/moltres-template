import anyIsIterable from './anyIsIterable'

describe('anyIsIterable', () => {
  test('returns true for arrays', () => {
    expect(anyIsIterable([])).toBe(true)
    expect(anyIsIterable(new Array())).toBe(true)
    expect(anyIsIterable([1, 2, 3])).toBe(true)
  })

  test('returns true for strings', () => {
    expect(anyIsIterable('')).toBe(true)
    expect(anyIsIterable('abc')).toBe(true)
    expect(anyIsIterable(new String(''))).toBe(true)
  })

  test('returns true for generators', () => {
    expect(anyIsIterable((function* () {})())).toBe(true)
  })

  test('returns true for Set', () => {
    expect(anyIsIterable(new Set())).toBe(true)
  })

  test('returns false for plain objects', () => {
    expect(anyIsIterable({})).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsIterable(undefined)).toBe(false)
    expect(anyIsIterable(null)).toBe(false)
    expect(anyIsIterable(false)).toBe(false)
    expect(anyIsIterable(true)).toBe(false)
    expect(anyIsIterable(0)).toBe(false)
    expect(anyIsIterable(-1)).toBe(false)
    expect(anyIsIterable(1)).toBe(false)
    expect(anyIsIterable(NaN)).toBe(false)
    expect(anyIsIterable(Infinity)).toBe(false)
    expect(anyIsIterable(-Infinity)).toBe(false)
    expect(anyIsIterable(/abc/)).toBe(false)
    expect(anyIsIterable(async () => {})).toBe(false)
    expect(anyIsIterable(() => {})).toBe(false)
    expect(anyIsIterable(function () {})).toBe(false)
    expect(anyIsIterable(function* () {})).toBe(false)
    expect(anyIsIterable(new ArrayBuffer(2))).toBe(false)
    expect(anyIsIterable(new Boolean(false))).toBe(false)
    expect(anyIsIterable(new Boolean(true))).toBe(false)
    expect(anyIsIterable(new Date())).toBe(false)
    expect(anyIsIterable(new Error())).toBe(false)
    expect(anyIsIterable(new Number(-1.2))).toBe(false)
    expect(anyIsIterable(new Number(1.2))).toBe(false)
    expect(anyIsIterable(new Number(NaN))).toBe(false)
    expect(anyIsIterable(new Number(Infinity))).toBe(false)
    expect(anyIsIterable(new Number(-Infinity))).toBe(false)
    expect(anyIsIterable(new Promise(() => {}))).toBe(false)
    expect(anyIsIterable(new Proxy({}, {}))).toBe(false)
    expect(anyIsIterable(Symbol('abc'))).toBe(false)
    expect(anyIsIterable(new WeakMap())).toBe(false)
    expect(anyIsIterable(new WeakSet())).toBe(false)
  })
})
