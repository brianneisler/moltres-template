import isArray from './isArray'
import isImmutableList from './isImmutableList'
import isSelector from './isSelector'
import isString from './isString'

const canBeSelector = (value) =>
  isString(value) ||
  isImmutableList(value) ||
  isArray(value) ||
  isSelector(value)

export default canBeSelector
