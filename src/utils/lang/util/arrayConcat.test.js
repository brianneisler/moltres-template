import arrayConcat from './arrayConcat'

describe('arrayConcat', () => {
  test('concats one array with another', () => {
    expect(arrayConcat(['foo'], ['bar'])).toEqual(['foo', 'bar'])
  })

  test('concats more than one array with another', () => {
    expect(arrayConcat([1, 2, 3], [4, 5, 6], [7, 8, 9])).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ])
  })

  test('concats values as arrays', () => {
    expect(arrayConcat(['a', 'b', 'c'], 1, [2, 3])).toEqual([
      'a',
      'b',
      'c',
      1,
      2,
      3
    ])
  })
})
