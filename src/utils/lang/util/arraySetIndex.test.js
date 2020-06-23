import { values } from '../../../test'
import arraySetIndex from './arraySetIndex'

describe('arraySetIndex', () => {
  test('sets an Index in an Array where the index exists', () => {
    const array = [1, 2, 3]
    const result = arraySetIndex(array, 1, 'foo')
    expect(result).toEqual([1, 'foo', 3])
    expect(array).toEqual([1, 2, 3])
  })

  test('sets a non existing Index in an Array', () => {
    const array = [1, 2, 3]
    const result = arraySetIndex(array, 3, 'foo')
    expect(result).toEqual([1, 2, 3, 'foo'])
    expect(result.length).toEqual(4)
    expect(array).toEqual([1, 2, 3])
    expect(array.length).toEqual(3)
  })

  test('updates a non existing Index in an Array with undefined', () => {
    const array = [1, 2, 3]
    const result = arraySetIndex(array, 4, undefined)
    expect(result).toEqual([1, 2, 3, undefined, undefined])
    expect(result.length).toEqual(5)
    expect(array).toEqual([1, 2, 3])
    expect(array.length).toEqual(3)
  })

  test('Setting an existing Index to the same value returns the same Array', () => {
    values().forEach((value) => {
      const array = [value]
      const result = arraySetIndex(array, 0, value)
      expect(result).toEqual([value])
      expect(result.length).toEqual(1)
      expect(result).toBe(array)
    })
  })
})
