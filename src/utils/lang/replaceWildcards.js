import containsWildcard from './containsWildcard'
import createPath from './createPath'
import curry from './curry'
import isArray from './isArray'
import isFunction from './isFunction'
import isImmutableList from './isImmutableList'
import isNil from './isNil'
import isString from './isString'
import join from './join'
import map from './map'
import replaceWildcard from './replaceWildcard'

const replaceWildcards = curry((wildValues, value) => {
  if (isNil(value)) {
    throw new Error(`replaceWildcards expects 'value' to be not nil`)
  }
  if (!containsWildcard(value)) {
    return value
  }
  if (isFunction(value.replaceWildcards)) {
    return value.replaceWildcards(wildValues)
  }
  if (isString(value)) {
    return join('.', map(replaceWildcard(wildValues), createPath(value)))
  }
  if (isArray(value) || isImmutableList(value)) {
    return map(replaceWildcard(wildValues), value)
  }
  throw new Error(`Cannot replace wildcards for value ${value}`)
})

export default replaceWildcards
