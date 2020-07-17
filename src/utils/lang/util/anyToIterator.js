import { START } from '../constants/Iterator'
import { ITERATOR } from '../constants/Symbol'

import anyIsArrayLike from './anyIsArrayLike'
import anyIsIndexedIterator from './anyIsIndexedIterator'
import anyIsIterable from './anyIsIterable'
import anyIsIterator from './anyIsIterator'
import anyIsKeyedIterator from './anyIsKeyedIterator'
import anyIsObjectLike from './anyIsObjectLike'
import arrayLikeToIterator from './arrayLikeToIterator'
import iteratorResolver from './iteratorResolver'
import objectToIterator from './objectToIterator'

/**
 * This method generates an iterator for the given value
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param  {*} any The collection or iterator to iterate over
 * @param  {string} start The position to start at for iteration
 * @returns {Iterator} The Iterator for the given value
 * @example
 *
 * anyToIterator(['a', 'b', 'c'])
 * //=> { next: () => { value: string, index: number, kdx: umber, done: boolean }}
 *
 * anyToIterator('abc')
 * //=> { next: () => { value: string, index: number, kdx: umber, done: boolean }}
 *
 * anyToIterator({ a: 1, b: 2, c: 3 })
 * //=> { next: () => { value: number, key: string, kdx: string, done: boolean }}
 */
const anyToIterator = (any, start = START) => {
  if (anyIsIterator(any)) {
    if (anyIsIndexedIterator(any) || anyIsKeyedIterator(any) || any.resolver) {
      return any
    }
    return iteratorResolver(any, start)
  }
  if (anyIsArrayLike(any)) {
    return arrayLikeToIterator(any, start)
  }
  if (anyIsIterable(any)) {
    return iteratorResolver(any[ITERATOR](), start)
  }
  if (anyIsObjectLike(any)) {
    return objectToIterator(any, start)
  }
  throw new Error(
    `iterator method expected to receive an iterable value. Instead the method was given ${any}.`
  )
}

export default anyToIterator
