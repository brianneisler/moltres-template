import { ImmutableList, ImmutableMap } from './classes'
import isEmpty from './isEmpty'

describe('isEmpty', () => {
  test('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  test('returns true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })

  test('returns true for NaN', () => {
    expect(isEmpty(NaN)).toBe(true)
  })

  test('returns true for empty String', () => {
    expect(isEmpty('')).toBe(true)
  })

  test('returns true for empty Array', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('returns true for empty Object', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('returns true for empty ImmutableList', () => {
    expect(isEmpty(ImmutableList([]))).toBe(true)
  })

  test('returns true for empty ImmutableMap', () => {
    expect(isEmpty(ImmutableMap({}))).toBe(true)
  })

  test('returns false for 0', () => {
    expect(isEmpty(0)).toBe(false)
  })

  test('returns false for non empty string', () => {
    expect(isEmpty('foo')).toBe(false)
  })

  test('returns false for Array with elements', () => {
    expect(isEmpty(['foo'])).toBe(false)
  })

  test('returns false for Object with property and value', () => {
    expect(isEmpty({ foo: 'bar' })).toBe(false)
  })

  test('returns false for ImmutableList with elements', () => {
    expect(isEmpty(ImmutableList(['foo']))).toBe(false)
  })

  test('returns false for ImmutableMap with property and value', () => {
    expect(isEmpty(ImmutableMap({ foo: 'bar' }))).toBe(false)
  })
})
