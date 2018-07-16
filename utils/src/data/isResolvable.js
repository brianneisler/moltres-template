import isGenerator from './isGenerator'
import isPromise from './isPromise'

const isResolvable = (value) => isGenerator(value) || isPromise(value)

export default isResolvable
