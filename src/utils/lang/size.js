import { length } from 'ramda'

import isArrayLike from './isArrayLike'
import isImmutable from './isImmutable'
import isMap from './isMap'
import isObject from './isObject'
import isSet from './isSet'
import keys from './keys'

const size = (value) => {
  if (isImmutable(value) || isMap(value) || isSet(value)) {
    return value.size
  }
  if (isArrayLike(value)) {
    return length(value)
  }
  if (isObject(value)) {
    return length(keys(value))
  }
  return length(value)
}

export default size
