import anyIsArrayLike from './anyIsArrayLike'

describe('anyIsArrayLike', () => {
  test('returns true for arrays', () => {
    expect(anyIsArrayLike([])).toBe(true)
    expect(anyIsArrayLike(new Array(0))).toBe(true)
    expect(anyIsArrayLike([0])).toBe(true)
  })

  test('returns true for strings', () => {
    expect(anyIsArrayLike('')).toBe(true)
    expect(anyIsArrayLike('abc')).toBe(true)
    expect(anyIsArrayLike(new String('abc'))).toBe(true)
  })

  test('returns true for object with length', () => {
    expect(anyIsArrayLike({ length: 0 })).toBe(true)
    expect(anyIsArrayLike({ length: 1 })).toBe(true)
  })

  test('returns false for functions with parameters', () => {
    // eslint-disable-next-line no-unused-vars
    expect(anyIsArrayLike(function (foo, bar) {})).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(anyIsArrayLike(undefined)).toBe(false)
    expect(anyIsArrayLike(null)).toBe(false)
    expect(anyIsArrayLike(false)).toBe(false)
    expect(anyIsArrayLike(true)).toBe(false)
    expect(anyIsArrayLike(0)).toBe(false)
    expect(anyIsArrayLike(-1)).toBe(false)
    expect(anyIsArrayLike(1)).toBe(false)
    expect(anyIsArrayLike(NaN)).toBe(false)
    expect(anyIsArrayLike(Infinity)).toBe(false)
    expect(anyIsArrayLike(-Infinity)).toBe(false)
    expect(anyIsArrayLike({})).toBe(false)
    expect(anyIsArrayLike(/abc/)).toBe(false)
    expect(anyIsArrayLike(async () => {})).toBe(false)
    expect(anyIsArrayLike(() => {})).toBe(false)
    expect(anyIsArrayLike(function () {})).toBe(false)
    expect(anyIsArrayLike((function* () {})())).toBe(false)
    expect(anyIsArrayLike(new ArrayBuffer(2))).toBe(false)
    expect(anyIsArrayLike(new Boolean(false))).toBe(false)
    expect(anyIsArrayLike(new Boolean(true))).toBe(false)
    expect(anyIsArrayLike(new Date())).toBe(false)
    expect(anyIsArrayLike(new Error())).toBe(false)
    expect(anyIsArrayLike(new Number(1))).toBe(false)
    expect(anyIsArrayLike(new Promise(() => {}))).toBe(false)
    expect(anyIsArrayLike(new Proxy({}, {}))).toBe(false)
    expect(anyIsArrayLike(new Set())).toBe(false)
    expect(anyIsArrayLike(Symbol('abc'))).toBe(false)
    expect(anyIsArrayLike(new WeakMap())).toBe(false)
    expect(anyIsArrayLike(new WeakSet())).toBe(false)
  })
})
