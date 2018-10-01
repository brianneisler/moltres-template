import { SYMBOL_ITERATOR } from '../constants'
import arrayIterator from './arrayIterator'
import isArrayLike from './isArrayLike'
import isIterable from './isIterable'
import isIterator from './isIterator'
import isObjectLike from './isObjectLike'
import objectIterator from './objectIterator'

const iterator = (value) => {
  if (isIterator(value)) {
    return value
  }
  if (isArrayLike(value)) {
    return arrayIterator(value)
  }
  if (isIterable(value)) {
    return value[SYMBOL_ITERATOR]()
  }
  if (isObjectLike(value)) {
    return objectIterator(value)
  }
  throw new Error(
    `iterator method expected to receive an iterable value. Instead the method was given ${value}.`
  )
}

export default iterator
