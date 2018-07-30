import { isGenerator, isPromise } from 'moltres-utils'
import isOp from './isOp'

const isResolvable = (value) => isGenerator(value) || isPromise(value) || isOp(value)

export default isResolvable
