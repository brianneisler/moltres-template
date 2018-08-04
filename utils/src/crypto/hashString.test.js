import hashString from './hashString'

describe('hashString', () => {
  test('defaults to SHA256', () => {
    const result = hashString('abc123')
    expect(result).toBe('6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090')
  })
})
