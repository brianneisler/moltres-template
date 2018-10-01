import isResolvable from './isResolvable'

describe('isResolvable', () => {
  test('returns true for Op', () => {
    expect(
      isResolvable({
        ['@@redux-saga/IO']: 'op'
      })
    ).toBe(true)
  })

  test('returns true for Generator', () => {
    const generator = (function*() {})()
    expect(isResolvable(generator)).toBe(true)
  })

  test('returns true for Promise', () => {
    const promise = new Promise(() => {})
    expect(isResolvable(promise)).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isResolvable(null)).toBe(false)
    expect(isResolvable(undefined)).toBe(false)
    expect(isResolvable('')).toBe(false)
    expect(isResolvable('abc')).toBe(false)
    expect(isResolvable(false)).toBe(false)
    expect(isResolvable(true)).toBe(false)
    expect(isResolvable(0)).toBe(false)
    expect(isResolvable(-1)).toBe(false)
    expect(isResolvable(1)).toBe(false)
    expect(isResolvable(NaN)).toBe(false)
    expect(isResolvable(Infinity)).toBe(false)
    expect(isResolvable(-Infinity)).toBe(false)
    expect(isResolvable([])).toBe(false)
    expect(isResolvable({})).toBe(false)
    expect(isResolvable(() => {})).toBe(false)
  })
})
