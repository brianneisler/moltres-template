import curry from './curry'
import { anyIsNaN } from './util'

const isNaN = curry(anyIsNaN)

export default isNaN
