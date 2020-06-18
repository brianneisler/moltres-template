import curry from './curry'
import getPath from './getPath'
import isArray from './isArray'
import isFunction from './isFunction'
import isImmutableList from './isImmutableList'
import isNil from './isNil'
import isSelector from './isSelector'
import isString from './isString'

const select = curry((selector, state, ...rest) => {
  if (isNil(selector)) {
    return state
  }
  if (isFunction(selector)) {
    return selector(state, ...rest)
  }
  if (isSelector(selector)) {
    return selector.select(state, ...rest)
  }
  if (isArray(selector) || isImmutableList(selector) || isString(selector)) {
    return getPath(selector, state)
  }
  throw new TypeError(`unknown selector type ${selector}`)
})

export default select
