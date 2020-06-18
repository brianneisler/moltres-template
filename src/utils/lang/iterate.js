import anyIterate from './util/anyIterate'
import curry from './curry'

const iterate = curry((func, any) => anyIterate(any, func))

export default iterate
