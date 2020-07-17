import Op from '../classes/Op'

import anyIsOp from './anyIsOp'

describe('anyIsOp', () => {
  test('returns true for Op', () => {
    expect(anyIsOp(new Op(() => {}))).toBe(true)
  })

  test('returns true for redux saga op', () => {
    expect(
      anyIsOp({
        ['@@redux-saga/IO']: 'op'
      })
    ).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(anyIsOp(null)).toBe(false)
    expect(anyIsOp(undefined)).toBe(false)
    expect(anyIsOp('')).toBe(false)
    expect(anyIsOp('abc')).toBe(false)
    expect(anyIsOp(false)).toBe(false)
    expect(anyIsOp(true)).toBe(false)
    expect(anyIsOp(0)).toBe(false)
    expect(anyIsOp(-1)).toBe(false)
    expect(anyIsOp(1)).toBe(false)
    expect(anyIsOp(NaN)).toBe(false)
    expect(anyIsOp(Infinity)).toBe(false)
    expect(anyIsOp(-Infinity)).toBe(false)
    expect(anyIsOp([])).toBe(false)
    expect(anyIsOp({})).toBe(false)
    expect(anyIsOp(() => {})).toBe(false)
  })
})
