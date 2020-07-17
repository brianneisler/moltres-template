import isArray from './isArray'
import isIterable from './isIterable'
import iterator from './iterator'
import { iteratorToArray } from './util'

const toArray = (value) => {
  if (isArray(value)) {
    return value
  }
  if (isIterable(value)) {
    return iteratorToArray(iterator(value))
  }
  throw new TypeError(
    `toArray expected 'value' parameter to be an Array or Iterable. Instead was given ${value}`
  )
}

export default toArray
