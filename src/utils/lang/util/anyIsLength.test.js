import { MAX_SAFE } from '../constants/Integer'

import anyIsLength from './anyIsLength'

describe('anyIsLength', () => {
  test('returns true for postive integer', () => {
    expect(anyIsLength(123)).toBe(true)
  })

  test('returns true 0', () => {
    expect(anyIsLength(0)).toBe(true)
  })

  test('returns true for -0', () => {
    expect(anyIsLength(-0)).toBe(true)
  })

  test('returns true for MAX_SAFE', () => {
    expect(anyIsLength(MAX_SAFE)).toBe(true)
  })

  test('returns false for negative integers', () => {
    expect(anyIsLength(-1)).toBe(false)
  })

  test('returns false for real numbers that are not integers', () => {
    expect(anyIsLength(1.23)).toBe(false)
  })

  test('returns false for integer greater than MAX_SAFE', () => {
    expect(anyIsLength(MAX_SAFE + 1)).toBe(false)
  })
})
