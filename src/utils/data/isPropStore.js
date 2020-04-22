import isFunction from './isFunction'
import isObject from './isObject'

const isPropStore = (value) => isObject(value) && isFunction(value.getProps)

export default isPropStore
