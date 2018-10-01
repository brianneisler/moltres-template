import isNaN from './isNaN'

describe('isNaN', () => {
  test('returns true for NaN', () => {
    expect(isNaN(NaN)).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isNaN(undefined)).toBe(false)
    expect(isNaN(null)).toBe(false)
    expect(isNaN('')).toBe(false)
    expect(isNaN('abc')).toBe(false)
    expect(isNaN(false)).toBe(false)
    expect(isNaN(true)).toBe(false)
    expect(isNaN(0)).toBe(false)
    expect(isNaN(-1)).toBe(false)
    expect(isNaN(1)).toBe(false)
    expect(isNaN(Infinity)).toBe(false)
    expect(isNaN(-Infinity)).toBe(false)
    expect(isNaN([])).toBe(false)
    expect(isNaN({})).toBe(false)
    expect(isNaN(() => {})).toBe(false)
  })
})
