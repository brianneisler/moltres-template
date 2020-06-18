import isArray from './isArray'
import isImmutableList from './isImmutableList'

const isPath = (value) => isArray(value) || isImmutableList(value)

export default isPath
