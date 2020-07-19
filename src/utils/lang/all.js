import Promise from 'bluebird'

import isArray from './isArray'
import isObject from './isObject'

const all = (value) => {
  if (isArray(value)) {
    return Promise.all(value)
  } else if (isObject(value)) {
    return Promise.props(value)
  }
  throw new Error(`all does not support this type ${value}`)
}

export default all
