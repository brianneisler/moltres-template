import anyIsString from './anyIsString'

describe('anyIsString', () => {
  test('returns true for plain strings', () => {
    expect(anyIsString('')).toBe(true)
    expect(anyIsString('abc')).toBe(true)
  })

  test('returns true for String objects', () => {
    expect(anyIsString(new String())).toBe(true)
    expect(anyIsString(new String(''))).toBe(true)
    expect(anyIsString(new String('abc'))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsString(undefined)).toBe(false)
    expect(anyIsString(null)).toBe(false)
    expect(anyIsString(false)).toBe(false)
    expect(anyIsString(true)).toBe(false)
    expect(anyIsString(0)).toBe(false)
    expect(anyIsString(-1)).toBe(false)
    expect(anyIsString(1)).toBe(false)
    expect(anyIsString(-1.2)).toBe(false)
    expect(anyIsString(1.2)).toBe(false)
    expect(anyIsString(NaN)).toBe(false)
    expect(anyIsString(Infinity)).toBe(false)
    expect(anyIsString(-Infinity)).toBe(false)
    expect(anyIsString(new Date())).toBe(false)
    expect(anyIsString(/.*/)).toBe(false)
    expect(anyIsString([])).toBe(false)
    expect(anyIsString({})).toBe(false)
    expect(anyIsString(() => {})).toBe(false)
  })
})
