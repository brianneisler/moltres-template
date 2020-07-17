import arrayDifference from './arrayDifference'

describe('arrayDifference', () => {
  test('returns an array with only values that are in the first array and not in the second', () => {
    const array = ['a', 'b', 'c']
    const second = ['c', 'd', 'e']
    const result = arrayDifference(array, second)
    expect(result).toEqual(['a', 'b'])
  })

  test('does not modify first or second array', () => {
    const array = ['a', 'b', 'c']
    const second = ['c', 'd', 'e']
    arrayDifference(array, second)

    expect(array).toEqual(['a', 'b', 'c'])
    expect(second).toEqual(['c', 'd', 'e'])
  })

  test('remove duplicates but not from unmatched ones', () => {
    const array = ['a', 'a', 'b', 'b', 'c', 'c']
    const second = ['c']
    const result = arrayDifference(array, second)
    expect(result).toEqual(['a', 'a', 'b', 'b'])
  })

  test('removes based on reference', () => {
    const array = [{ a: 1 }, { b: 2 }]
    const second = [{ b: 2 }]
    const result = arrayDifference(array, second)
    expect(result).toEqual([{ a: 1 }, { b: 2 }])
  })
})
