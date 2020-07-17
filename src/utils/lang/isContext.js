import isObject from './isObject'

const isContext = (value) => isObject(value) && value.isContext

export default isContext
