import stringSubstring from './stringSubstring'

describe('stringSubstring', () => {
  test('Get a substring from the given index', () => {
    expect(stringSubstring('foo', 0)).toBe('foo')
    expect(stringSubstring('foo', 1)).toBe('oo')
    expect(stringSubstring('foo', 2)).toBe('o')
    expect(stringSubstring('foo', 3)).toBe('')
  })
})
