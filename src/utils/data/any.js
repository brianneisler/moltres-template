import curry from './curry'
import find from './find'

const any = curry((predicate, value) => !!find(predicate, value))

export default any
