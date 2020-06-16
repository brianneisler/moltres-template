import ReadableBufferStream from './ReadableBufferStream'

const bufferToStream = (
  buffer,
  options = { chunkSize: 2048, frequency: 10 }
) => {
  const stream = new ReadableBufferStream(options)
  stream.put(buffer)
  stream.stop()
  return stream
}

export default bufferToStream
