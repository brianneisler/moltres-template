import curry from './curry'
import isFunction from './isFunction'
import isNil from './isNil'
import isUndefined from './isUndefined'

const getProp = curry((prop, value) => {
  if (isUndefined(prop) || prop === '$') {
    return value
  }
  if (isFunction(prop)) {
    return prop(value)
  }
  if (isNil(value)) {
    return undefined
  }
  if (isFunction(value.get)) {
    return value.get(prop)
  }
  return value[prop]
})

export default getProp
