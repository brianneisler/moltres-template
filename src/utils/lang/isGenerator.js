import curry from './curry'
import { anyIsGenerator } from './util'

const isGenerator = curry(anyIsGenerator)

export default isGenerator
