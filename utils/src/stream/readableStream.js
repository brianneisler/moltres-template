import stream from 'readable-stream'

const readableStream = (...args) => new stream.Readable(...args)

export default readableStream
