import anyIsPromise from './anyIsPromise'

describe('anyIsPromise', () => {
  test('returns true for Promise', () => {
    expect(anyIsPromise(new Promise(() => {}))).toBe(true)
  })

  test('returns true for object with then method', () => {
    expect(
      anyIsPromise({
        then: () => {}
      })
    ).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsPromise(undefined)).toBe(false)
    expect(anyIsPromise(null)).toBe(false)
    expect(anyIsPromise('')).toBe(false)
    expect(anyIsPromise('abc')).toBe(false)
    expect(anyIsPromise(false)).toBe(false)
    expect(anyIsPromise(true)).toBe(false)
    expect(anyIsPromise(0)).toBe(false)
    expect(anyIsPromise(-1)).toBe(false)
    expect(anyIsPromise(1)).toBe(false)
    expect(anyIsPromise(NaN)).toBe(false)
    expect(anyIsPromise(Infinity)).toBe(false)
    expect(anyIsPromise(-Infinity)).toBe(false)
    expect(anyIsPromise({})).toBe(false)
    expect(anyIsPromise([])).toBe(false)
    expect(anyIsPromise(new Array(0))).toBe(false)
    expect(anyIsPromise([0])).toBe(false)
    expect(anyIsPromise(/abc/)).toBe(false)
    expect(anyIsPromise(async () => {})).toBe(false)
    expect(anyIsPromise(() => {})).toBe(false)
    expect(anyIsPromise(function () {})).toBe(false)
    expect(anyIsPromise((function* () {})())).toBe(false)
    expect(anyIsPromise(new ArrayBuffer(2))).toBe(false)
    expect(anyIsPromise(new Boolean(false))).toBe(false)
    expect(anyIsPromise(new Boolean(true))).toBe(false)
    expect(anyIsPromise(new Date())).toBe(false)
    expect(anyIsPromise(new Error())).toBe(false)
    expect(anyIsPromise(new Map())).toBe(false)
    expect(anyIsPromise(new Number(1))).toBe(false)
    expect(anyIsPromise(new Proxy({}, {}))).toBe(false)
    expect(anyIsPromise(new Set())).toBe(false)
    expect(anyIsPromise(new String('abc'))).toBe(false)
    expect(anyIsPromise(Symbol('abc'))).toBe(false)
    expect(anyIsPromise(new WeakMap())).toBe(false)
    expect(anyIsPromise(new WeakSet())).toBe(false)
  })
})
