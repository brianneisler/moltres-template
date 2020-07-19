import curry from './curry'
import anyIterateRight from './util/anyIterateRight'

const iterateRight = curry((func, any) => anyIterateRight(any, func))

export default iterateRight
