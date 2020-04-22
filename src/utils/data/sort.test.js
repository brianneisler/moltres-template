import { ImmutableList } from './js'
import sort from './sort'

describe('sort', () => {
  test('sorts an array of strings in alphabetical order', () => {
    const values = ['foo', 'bar', 'baz']
    const result = sort((itemA, itemB) => itemA > itemB, values)
    expect(result).toEqual(['bar', 'baz', 'foo'])
  })

  test('sorts an ImmutableList of strings in alphabetical order', () => {
    const values = ImmutableList(['foo', 'bar', 'baz'])
    const result = sort((itemA, itemB) => itemA > itemB, values)
    expect(result).toEqual(ImmutableList(['bar', 'baz', 'foo']))
  })
})