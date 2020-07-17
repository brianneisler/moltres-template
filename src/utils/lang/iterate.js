import anyIterate from './util/anyIterate'
import curry from './curry'
import iterator from './iterator'

const iterate = curry((func, any) => anyIterate(iterator(any), func))

export default iterate
