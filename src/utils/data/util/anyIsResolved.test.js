import anyIsResolved from './anyIsResolved'

describe('anyIsResolved', () => {
  test('returns false for Op', () => {
    expect(
      anyIsResolved({
        ['@@redux-saga/IO']: 'op'
      })
    ).toBe(false)
  })

  test('returns false for Generator', () => {
    const generator = (function* () {})()
    expect(anyIsResolved(generator)).toBe(false)
  })

  test('returns false for Promise', () => {
    const promise = new Promise(() => {})
    expect(anyIsResolved(promise)).toBe(false)
  })

  test('returns false for object with resolve method', () => {
    expect(anyIsResolved({ resolve: () => 'foo' })).toBe(false)
  })

  test('returns true for all other values', () => {
    expect(anyIsResolved(null)).toBe(true)
    expect(anyIsResolved(undefined)).toBe(true)
    expect(anyIsResolved('')).toBe(true)
    expect(anyIsResolved('abc')).toBe(true)
    expect(anyIsResolved(false)).toBe(true)
    expect(anyIsResolved(true)).toBe(true)
    expect(anyIsResolved(0)).toBe(true)
    expect(anyIsResolved(-1)).toBe(true)
    expect(anyIsResolved(1)).toBe(true)
    expect(anyIsResolved(NaN)).toBe(true)
    expect(anyIsResolved(Infinity)).toBe(true)
    expect(anyIsResolved(-Infinity)).toBe(true)
    expect(anyIsResolved([])).toBe(true)
    expect(anyIsResolved({})).toBe(true)
    expect(anyIsResolved(() => {})).toBe(true)
  })
})
