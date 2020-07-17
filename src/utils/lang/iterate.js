import curry from './curry'
import iterator from './iterator'
import anyIterate from './util/anyIterate'

const iterate = curry((func, any) => anyIterate(iterator(any), func))

export default iterate
