import containsWildcard from './containsWildcard'

describe('containsWildcard', () => {
  test('string without a wildcard returns false', () => {
    expect(containsWildcard('abc')).toBe(false)
  })

  test('string that contains a colon but not a wildcard returns false', () => {
    expect(containsWildcard('abc:')).toBe(false)
  })

  test('string that contains a wildcard returns true', () => {
    expect(containsWildcard('abc.:def')).toBe(true)
  })
})
