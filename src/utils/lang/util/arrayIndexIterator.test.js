import arrayIndexIterator from './arrayIndexIterator'

describe('arrayIndexIterator', () => {
  test('returns an array of the indexes of the Array', () => {
    const array = ['a', 'b', 'c']
    const result = arrayIndexIterator(array)
    expect(result.next).toBeInstanceOf(Function)
    expect(result.next()).toEqual({
      done: false,
      value: 0
    })
    expect(result.next()).toEqual({
      done: false,
      value: 1
    })
    expect(result.next()).toEqual({
      done: false,
      value: 2
    })
    expect(result.next()).toEqual({
      done: true
    })
  })
})
