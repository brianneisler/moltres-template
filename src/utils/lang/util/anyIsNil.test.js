import anyIsNil from './anyIsNil'

describe('anyIsNil', () => {
  test('returns true for null', () => {
    expect(anyIsNil(null)).toBe(true)
  })

  test('returns true for undefined', () => {
    expect(anyIsNil(undefined)).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsNil('')).toBe(false)
    expect(anyIsNil('abc')).toBe(false)
    expect(anyIsNil(false)).toBe(false)
    expect(anyIsNil(true)).toBe(false)
    expect(anyIsNil(0)).toBe(false)
    expect(anyIsNil(-1)).toBe(false)
    expect(anyIsNil(1)).toBe(false)
    expect(anyIsNil(NaN)).toBe(false)
    expect(anyIsNil(Infinity)).toBe(false)
    expect(anyIsNil(-Infinity)).toBe(false)
    expect(anyIsNil({})).toBe(false)
    expect(anyIsNil([])).toBe(false)
    expect(anyIsNil(new Array(0))).toBe(false)
    expect(anyIsNil([0])).toBe(false)
    expect(anyIsNil(/abc/)).toBe(false)
    expect(anyIsNil(async () => {})).toBe(false)
    expect(anyIsNil(() => {})).toBe(false)
    expect(anyIsNil(function () {})).toBe(false)
    expect(anyIsNil((function* () {})())).toBe(false)
    expect(anyIsNil(new ArrayBuffer(2))).toBe(false)
    expect(anyIsNil(new Boolean(false))).toBe(false)
    expect(anyIsNil(new Boolean(true))).toBe(false)
    expect(anyIsNil(new Date())).toBe(false)
    expect(anyIsNil(new Error())).toBe(false)
    expect(anyIsNil(new Map())).toBe(false)
    expect(anyIsNil(new Number(1))).toBe(false)
    expect(anyIsNil(new Promise(() => {}))).toBe(false)
    expect(anyIsNil(new Proxy({}, {}))).toBe(false)
    expect(anyIsNil(new Set())).toBe(false)
    expect(anyIsNil(new String('abc'))).toBe(false)
    expect(anyIsNil(Symbol('abc'))).toBe(false)
    expect(anyIsNil(new WeakMap())).toBe(false)
    expect(anyIsNil(new WeakSet())).toBe(false)
  })
})
