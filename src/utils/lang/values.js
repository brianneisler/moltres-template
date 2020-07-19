import { values as rValues } from 'ramda'

import isFunction from './isFunction'

const values = (value) => {
  if (value && isFunction(value.valueSeq)) {
    return value.valueSeq().toList()
  }
  return rValues(value)
}

export default values
