import { ImmutableList } from './classes'
import sort from './sort'

describe('sort', () => {
  test('sorts an array of strings in alphabetical order', () => {
    const values = ['foo', 'bar', 'baz']
    const result = sort((itemA, itemB) => {
      if (itemA > itemB) {
        return 1
      }
      if (itemB > itemA) {
        return -1
      }
      return 0
    }, values)
    expect(result).toEqual(['bar', 'baz', 'foo'])
  })

  test('sorts an ImmutableList of strings in alphabetical order', () => {
    const values = ImmutableList(['foo', 'bar', 'baz'])
    const result = sort((itemA, itemB) => {
      if (itemA > itemB) {
        return 1
      }
      if (itemB > itemA) {
        return -1
      }
      return 0
    }, values)
    expect(result).toEqual(ImmutableList(['bar', 'baz', 'foo']))
  })
})
