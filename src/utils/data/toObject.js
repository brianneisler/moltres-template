import isFunction from './isFunction'
import isObject from './isObject'

const toObject = (value) => {
  if (isObject(value)) {
    if (isFunction(value.toObject)) {
      return value.toObject()
    }
    return value
  }

  // TODO BRN: Convert non object values to object
  return value
}

export default toObject
