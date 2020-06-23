import { ImmutableList } from './classes'
import nth from './nth'

describe('nth', () => {
  test('gets the given index', () => {
    expect(nth(0, ['abc'])).toBe('abc')
  })

  test('gets the character at the given index of a String', () => {
    expect(nth(2, 'fizbop')).toBe('z')
  })

  test('gets the value at the given index of an ImmutableList', () => {
    expect(nth(1, ImmutableList(['abc', 'def', 'ghi']))).toBe('def')
  })

  test('if offset is greater than length, undefined is returned', () => {
    expect(nth(1, ['abc'])).toBe(undefined)
  })

  test('if offset is negative it offsets from length', () => {
    expect(nth(-1, ['abc', 'foo'])).toBe('foo')
  })

  test('curries the nth function', () => {
    const first = nth(0)
    expect(first).toBeInstanceOf(Function)
    expect(first(['abc', 'foo'])).toBe('abc')
  })
})
