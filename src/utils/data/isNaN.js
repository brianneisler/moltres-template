import { anyIsNaN } from './util'
import curry from './curry'

const isNaN = curry(anyIsNaN)

export default isNaN
