import isGenerator from '../data/isGenerator'
import isOp from './isOp'
import isPromise from '../data/isPromise'

const isResolvable = (value) => isGenerator(value) || isPromise(value) || isOp(value)

export default isResolvable
