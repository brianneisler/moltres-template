import Buffer from './Buffer'

const streamToBuffer = async (stream) => {
  let buffer = Buffer.from([])
  return new Promise((resolve, reject) => {
    stream
      .on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk], buffer.length + chunk.length)
      })
      .on('error', (error) => reject(error))
      .on('end', () => resolve(buffer))
  })
}

export default streamToBuffer
