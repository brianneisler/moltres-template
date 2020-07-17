import { last as rLast } from 'ramda'

import isFunction from './isFunction'

const last = (value) => {
  if (value && isFunction(value.last)) {
    return value.last()
  }
  return rLast(value)
}

export default last
