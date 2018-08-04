import stringToStream from './stringToStream'

describe('stringToStream', () => {
  test('converts string to stream', async () => {
    const stream = stringToStream('abc123')
    stream.setEncoding('utf8')
    return new Promise((resolve, reject) => {
      let result = ''
      stream.on('data', (chunk) => {
        result += chunk.toString()
      })
      stream.on('end', () => {
        expect(result).toBe('abc123')
        resolve()
      })
      stream.on('error', (error) => reject(error))
    })
  })
})
