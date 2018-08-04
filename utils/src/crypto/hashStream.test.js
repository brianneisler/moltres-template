import stringToStream from '../stream/stringToStream'
import hashStream from './hashStream'

describe('hashStream', () => {
  test('defaults to SHA256', async () => {
    const result = await hashStream(stringToStream('abc123'))
    expect(result).toBe('6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090')
  })
})
