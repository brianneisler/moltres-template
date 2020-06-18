import { anyIsGenerator } from './util'
import curry from './curry'

const isGenerator = curry(anyIsGenerator)

export default isGenerator
