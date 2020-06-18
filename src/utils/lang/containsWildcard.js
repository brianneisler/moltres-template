import anyIsWildcard from './anyIsWildcard'
import createPath from './createPath'
import isArray from './isArray'
import isFunction from './isFunction'
import isImmutableList from './isImmutableList'
import isNil from './isNil'
import isString from './isString'

const containsWildcard = (value) => {
  if (isNil(value)) {
    return false
  }
  if (isFunction(value.containsWildcard)) {
    return value.containsWildcard()
  }
  if (isArray(value) || isImmutableList(value)) {
    return anyIsWildcard(value)
  }
  if (isString(value)) {
    return anyIsWildcard(createPath(value))
  }
  return false
}

export default containsWildcard
