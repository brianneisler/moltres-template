import readableStream from './readableStream'
import stream from 'readable-stream'

describe('readableStream', () => {
  test('converts string to stream', () => {
    const readable = readableStream()
    expect(readable).toBeInstanceOf(stream.Readable)
    expect(typeof readable.push).toBe('function')
  })
})
