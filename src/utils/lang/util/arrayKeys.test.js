import arrayKeys from './arrayKeys'

describe('arrayKeys', () => {
  test('returns an Iterator of the Indexes of the Array', () => {
    const array = ['a', 'b', 'c']
    const result = arrayKeys(array)
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
