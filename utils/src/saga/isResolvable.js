import isGenerator from '../data/isGenerator'
import isPromise from '../data/isPromise'
import isOp from './isOp'

const isResolvable = (value) => isGenerator(value) || isPromise(value) || isOp(value)

export default isResolvable
