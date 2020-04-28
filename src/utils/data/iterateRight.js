import anyIterateRight from './util/anyIterateRight'
import curry from './curry'

const iterateRight = curry((func, any) => anyIterateRight(any, func))

export default iterateRight
