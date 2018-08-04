import createBuffer from '../buffer/createBuffer'
import bufferToStream from './bufferToStream'

describe('bufferToStream', () => {
  test('converts string to stream', async () => {
    const buffer = createBuffer([0, 1, 2, 3, 4, 5])
    const stream = bufferToStream(buffer)
    return new Promise((resolve, reject) => {
      const result = []
      stream.on('data', (chunk) => {
        result.push(...chunk)
      })
      stream.on('end', () => {
        expect(result).toEqual([0, 1, 2, 3, 4, 5])
        resolve()
      })
      stream.on('error', (error) => reject(error))
    })
  })
})
