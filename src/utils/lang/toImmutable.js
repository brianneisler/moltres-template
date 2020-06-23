import { ImmutableList, ImmutableMap } from './classes'
import isArray from './isArray'
import isObject from './isObject'

const toImmutable = (value) => {
  if (isArray(value)) {
    return ImmutableList(value)
  } else if (isObject(value)) {
    return ImmutableMap(value)
  }
  return value
}

export default toImmutable
