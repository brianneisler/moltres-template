import stringSetIndex from './stringSetIndex'

describe('stringSetIndex', () => {
  test('sets an Index in an String where the index exists', () => {
    const string = 'aac'
    const result = stringSetIndex(string, 1, 'b')
    expect(result).toEqual('abc')
    expect(string).toEqual('aac')
  })

  test('sets a non existing Index in a String', () => {
    const string = 'abc'
    const result = stringSetIndex(string, 3, 'd')
    expect(result).toEqual('abcd')
    expect(result.length).toEqual(4)
    expect(string).toEqual('abc')
    expect(string.length).toEqual(3)
  })

  test('sets a non existing Index greater than the length at the end of the String', () => {
    const string = 'abc'
    const result = stringSetIndex(string, 5, 'e')
    expect(result).toEqual('abce')
    expect(result.length).toEqual(4)
    expect(string).toEqual('abc')
    expect(string.length).toEqual(3)
  })

  test('setting an existing Index to the same value returns the same String', () => {
    const string = 'abc'
    const result = stringSetIndex(string, 1, 'b')
    expect(result).toEqual('abc')
    expect(result).toBe(string)
  })

  test('setting more than one character in a string replaces the existing character and injects the full string', () => {
    const string = 'abf'
    const result = stringSetIndex(string, 1, 'bcde')
    expect(result).toEqual('abcdef')
    expect(string).toEqual('abf')
  })
})
