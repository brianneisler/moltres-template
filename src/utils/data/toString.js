import isFunction from './isFunction'
import isObject from './isObject'
import isString from './isString'

const toString = (value) => {
  if (isString(value)) {
    return value
  }
  if (isObject(value)) {
    if (isFunction(value.toString)) {
      return value.toString()
    }
  }

  return '' + value
}

export default toString
