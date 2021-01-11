import isObjectLike from './isObjectLike'
import isPlainObject from './isPlainObject'

const isDOMElement = (value) =>
  isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value)

export default isDOMElement
