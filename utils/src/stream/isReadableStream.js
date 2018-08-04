import { is } from 'ramda'
import stream from 'readable-stream'

const isReadableStream = is(stream.Readable)

export default isReadableStream
