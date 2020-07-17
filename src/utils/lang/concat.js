import { concat as rConcat } from 'ramda'

import curry from './curry'
import isArray from './isArray'
import isImmutable from './isImmutable'
import reduce from './reduce'
import values from './values'

const concat2 = (value0, value1) => {
  if (isArray(value0)) {
    if (isImmutable(value1)) {
      return rConcat(value0, values(value1).toArray())
    }
  }
  return rConcat(value0, value1)
}

const concat = curry((arg0, arg1, ...args) =>
  reduce(concat2, concat2(arg0, arg1), args)
)

export default concat
