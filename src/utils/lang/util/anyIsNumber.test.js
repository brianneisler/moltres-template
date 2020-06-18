import anyIsNumber from './anyIsNumber'

describe('anyIsNumber', () => {
  test('returns true for primitive numbers', () => {
    expect(anyIsNumber(0)).toBe(true)
    expect(anyIsNumber(-1)).toBe(true)
    expect(anyIsNumber(1)).toBe(true)
    expect(anyIsNumber(-1.2)).toBe(true)
    expect(anyIsNumber(1.2)).toBe(true)
  })

  test('returns true for NaN', () => {
    expect(anyIsNumber(NaN)).toBe(true)
  })

  test('returns true for Infinity', () => {
    expect(anyIsNumber(Infinity)).toBe(true)
    expect(anyIsNumber(-Infinity)).toBe(true)
  })

  test('returns true for Number objects', () => {
    expect(anyIsNumber(new Number(0))).toBe(true)
    expect(anyIsNumber(new Number(-1))).toBe(true)
    expect(anyIsNumber(new Number(1))).toBe(true)
    expect(anyIsNumber(new Number(-1.2))).toBe(true)
    expect(anyIsNumber(new Number(1.2))).toBe(true)
    expect(anyIsNumber(new Number(NaN))).toBe(true)
    expect(anyIsNumber(new Number(Infinity))).toBe(true)
    expect(anyIsNumber(new Number(-Infinity))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsNumber(undefined)).toBe(false)
    expect(anyIsNumber(null)).toBe(false)
    expect(anyIsNumber(false)).toBe(false)
    expect(anyIsNumber(true)).toBe(false)
    expect(anyIsNumber('')).toBe(false)
    expect(anyIsNumber('abc')).toBe(false)
    expect(anyIsNumber(/abc/)).toBe(false)
    expect(anyIsNumber([])).toBe(false)
    expect(anyIsNumber({})).toBe(false)
    expect(anyIsNumber(async () => {})).toBe(false)
    expect(anyIsNumber(() => {})).toBe(false)
    expect(anyIsNumber(function () {})).toBe(false)
    expect(anyIsNumber(function* () {})).toBe(false)
    expect(anyIsNumber((function* () {})())).toBe(false)
    expect(anyIsNumber(new Array(0))).toBe(false)
    expect(anyIsNumber(new ArrayBuffer(2))).toBe(false)
    expect(anyIsNumber(new Boolean(false))).toBe(false)
    expect(anyIsNumber(new Boolean(true))).toBe(false)
    expect(anyIsNumber(new Date())).toBe(false)
    expect(anyIsNumber(new Error())).toBe(false)
    expect(anyIsNumber(new Promise(() => {}))).toBe(false)
    expect(anyIsNumber(new Proxy({}, {}))).toBe(false)
    expect(anyIsNumber(new Set())).toBe(false)
    expect(anyIsNumber(new String())).toBe(false)
    expect(anyIsNumber(new String(''))).toBe(false)
    expect(anyIsNumber(new String('abc'))).toBe(false)
    expect(anyIsNumber(Symbol('abc'))).toBe(false)
    expect(anyIsNumber(new WeakMap())).toBe(false)
    expect(anyIsNumber(new WeakSet())).toBe(false)
  })
})
