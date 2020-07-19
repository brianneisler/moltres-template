import { append as rAppend } from 'ramda'

import curry from './curry'
import isImmutable from './isImmutable'

const append = curry((value, target) => {
  if (isImmutable(target)) {
    return target.push(value)
  }
  return rAppend(value, target)
})

export default append
