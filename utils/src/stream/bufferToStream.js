import ReadableBufferStream from './ReadableBufferStream'

const bufferToStream = (buffer, options = { frequency: 10, chunkSize: 2048 }) => {
  const stream = new ReadableBufferStream(options)
  stream.put(buffer)
  stream.stop()
  return stream
}

export default bufferToStream
