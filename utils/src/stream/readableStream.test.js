import stream from 'readable-stream'
import readableStream from './readableStream'

describe('readableStream', () => {
  test('converts string to stream', () => {
    const readable = readableStream()
    expect(readable).toBeInstanceOf(stream.Readable)
    expect(typeof readable.push).toBe('function')
  })
})
