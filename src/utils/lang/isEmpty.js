import { isEmpty as rIsEmpty } from 'ramda'

import isFunction from './isFunction'
import isNaN from './isNaN'
import isNil from './isNil'

const isEmpty = (value) => {
  // Fuck you ramda!
  // https://github.com/ramda/ramda/issues/2507
  if (isNil(value) || isNaN(value)) {
    return true
  }
  if (isFunction(value.isEmpty)) {
    return value.isEmpty()
  }
  return rIsEmpty(value)
}

export default isEmpty
