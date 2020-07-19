import { sort as rSort } from 'ramda'

import curry from './curry'
import isFunction from './isFunction'

const sort = curry((comparator, value) => {
  if (isFunction(value.sort)) {
    return value.sort(comparator)
  }
  return rSort(comparator, value)
})

export default sort
