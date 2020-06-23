import { ImmutableList } from './classes'
import concat from './concat'

describe('concat', () => {
  test('concats two Arrays', () => {
    expect(concat(['a', 'b', 'c'], ['d', 'e', 'f'])).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f'
    ])
  })

  test('concat an Array with an ImmutableList', () => {
    expect(concat(['a', 'b', 'c'], ImmutableList(['d', 'e', 'f']))).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f'
    ])
  })

  test('concat an ImmutableList with an Array', () => {
    expect(
      concat(ImmutableList(['a', 'b', 'c']), ImmutableList(['d', 'e', 'f']))
    ).toEqual(ImmutableList(['a', 'b', 'c', 'd', 'e', 'f']))
  })

  test('concat an ImmutableList with an Array', () => {
    expect(concat(ImmutableList(['a', 'b', 'c']), ['d', 'e', 'f'])).toEqual(
      ImmutableList(['a', 'b', 'c', 'd', 'e', 'f'])
    )
  })
})
