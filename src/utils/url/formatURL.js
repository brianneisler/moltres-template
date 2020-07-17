import { format } from 'url'

import { isFunction } from '../lang'

const formatURL = (value) => {
  if (isFunction(value)) {
    return (...args) => formatURL(value(...args))
  }
  return format(value)
}

export default formatURL
