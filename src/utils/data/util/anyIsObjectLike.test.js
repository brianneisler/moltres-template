import anyIsObjectLike from './anyIsObjectLike'

describe('anyIsObjectLike', () => {
  test('returns true for plain object', () => {
    expect(anyIsObjectLike({})).toBe(true)
    expect(anyIsObjectLike(new Object())).toBe(true)
  })

  test('returns true for complex object', () => {
    const ComplexObject = function () {}
    expect(anyIsObjectLike(new ComplexObject())).toBe(true)
  })

  test('returns true for plain array', () => {
    expect(anyIsObjectLike([])).toBe(true)
    expect(anyIsObjectLike(new Array())).toBe(true)
  })

  test('returns true for object versions of native values', () => {
    expect(anyIsObjectLike(new String('abc'))).toBe(true)
    expect(anyIsObjectLike(new Number(3.2))).toBe(true)
    expect(anyIsObjectLike(new Boolean(false))).toBe(true)
    expect(anyIsObjectLike(new Date())).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsObjectLike(undefined)).toBe(false)
    expect(anyIsObjectLike(null)).toBe(false)
    expect(anyIsObjectLike('')).toBe(false)
    expect(anyIsObjectLike('abc')).toBe(false)
    expect(anyIsObjectLike(false)).toBe(false)
    expect(anyIsObjectLike(true)).toBe(false)
    expect(anyIsObjectLike(0)).toBe(false)
    expect(anyIsObjectLike(-1)).toBe(false)
    expect(anyIsObjectLike(1)).toBe(false)
    expect(anyIsObjectLike(NaN)).toBe(false)
    expect(anyIsObjectLike(Infinity)).toBe(false)
    expect(anyIsObjectLike(-Infinity)).toBe(false)
    expect(anyIsObjectLike(function () {})).toBe(false)
    expect(anyIsObjectLike(async () => {})).toBe(false)
    expect(anyIsObjectLike(async function () {})).toBe(false)
    expect(anyIsObjectLike(function* () {})).toBe(false)
    expect(anyIsObjectLike(new Function('a', 'b', 'return a + b'))).toBe(false)
  })
})
