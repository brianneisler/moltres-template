import { keys as rKeys } from 'ramda'
import isFunction from './isFunction'

const keys = (value) => {
  if (value && isFunction(value.keySeq)) {
    return value.keySeq().toList()
  }
  return rKeys(value)
}

export default keys
