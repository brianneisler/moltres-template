import anyIsUndefined from './anyIsUndefined'

describe('anyIsUndefined', () => {
  test('returns true for undefined', () => {
    expect(anyIsUndefined(undefined)).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsUndefined(null)).toBe(false)
    expect(anyIsUndefined('')).toBe(false)
    expect(anyIsUndefined('abc')).toBe(false)
    expect(anyIsUndefined(false)).toBe(false)
    expect(anyIsUndefined(true)).toBe(false)
    expect(anyIsUndefined(0)).toBe(false)
    expect(anyIsUndefined(-1)).toBe(false)
    expect(anyIsUndefined(1)).toBe(false)
    expect(anyIsUndefined(NaN)).toBe(false)
    expect(anyIsUndefined(Infinity)).toBe(false)
    expect(anyIsUndefined(-Infinity)).toBe(false)
    expect(anyIsUndefined([])).toBe(false)
    expect(anyIsUndefined({})).toBe(false)
    expect(anyIsUndefined(() => {})).toBe(false)
  })
})
