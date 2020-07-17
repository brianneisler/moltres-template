import anyIsPlainObject from './anyIsPlainObject'

describe('anyIsPlainObject', () => {
  test('returns true for plain object', () => {
    expect(anyIsPlainObject({})).toBe(true)
    expect(anyIsPlainObject(new Object())).toBe(true)
    expect(anyIsPlainObject(Object.create(null))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsPlainObject(undefined)).toBe(false)
    expect(anyIsPlainObject(null)).toBe(false)
    expect(anyIsPlainObject('')).toBe(false)
    expect(anyIsPlainObject('abc')).toBe(false)
    expect(anyIsPlainObject(false)).toBe(false)
    expect(anyIsPlainObject(true)).toBe(false)
    expect(anyIsPlainObject(0)).toBe(false)
    expect(anyIsPlainObject(-1)).toBe(false)
    expect(anyIsPlainObject(1)).toBe(false)
    expect(anyIsPlainObject(NaN)).toBe(false)
    expect(anyIsPlainObject(Infinity)).toBe(false)
    expect(anyIsPlainObject(-Infinity)).toBe(false)
    expect(anyIsPlainObject(-Infinity)).toBe(false)
    expect(anyIsPlainObject([])).toBe(false)
    expect(anyIsPlainObject(new Array())).toBe(false)
    expect(anyIsPlainObject(() => {})).toBe(false)
    expect(anyIsPlainObject(function () {})).toBe(false)
    expect(anyIsPlainObject(async () => {})).toBe(false)
    expect(anyIsPlainObject(async function () {})).toBe(false)
    expect(anyIsPlainObject(function* () {})).toBe(false)
    const ComplexObject = function () {}
    expect(anyIsPlainObject(new ComplexObject())).toBe(false)
  })
})
