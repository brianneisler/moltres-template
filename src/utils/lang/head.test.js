import __ from './__'
import { ImmutableList } from './classes'
import head from './head'

describe('head', () => {
  test('gets the first element from an Array', () => {
    expect(head([1, 2, 3])).toBe(1)
  })

  test('gets the first element from a String', () => {
    expect(head('123')).toBe('1')
  })

  test('gets the first element from an ImmutableList', () => {
    expect(head(ImmutableList([1, 2, 3]))).toBe(1)
  })

  test('returns undefined from an empty Array', () => {
    expect(head([])).toBe(undefined)
  })

  test('curries the method with a placeholder', () => {
    const headPlaceholder = head(__)
    expect(headPlaceholder).toBeInstanceOf(Function)
    expect(headPlaceholder(['a', 'b', 'c'])).toBe('a')
  })

  // test('dispatches to the head() method if present', () => {
  //   const object = {
  //     head: () => 1
  //   }
  //   expect(head(object)).toBe(1)
  // })
})
