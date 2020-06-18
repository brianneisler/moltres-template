import arrayIndexes from './arrayIndexes'

describe('arrayIndexes', () => {
  test('returns an Array of the Indexes of the Array', () => {
    const array = ['a', 'b', 'c']
    const result = arrayIndexes(array)
    expect(result).toEqual([0, 1, 2])
  })
})
