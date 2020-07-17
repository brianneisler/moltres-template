import { head } from 'ramda'

import isFunction from './isFunction'

const first = (value) => {
  if (value && isFunction(value.first)) {
    return value.first()
  }
  return head(value)
}

export default first
