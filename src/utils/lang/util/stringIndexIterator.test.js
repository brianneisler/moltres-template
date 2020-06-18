import stringIndexIterator from './stringIndexIterator'

describe('stringIndexIterator', () => {
  test('returns an Array of the indexes of the String', () => {
    const string = 'abc'
    const result = stringIndexIterator(string)
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
