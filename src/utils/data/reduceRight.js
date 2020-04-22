import indexEndOffset from './util/indexEndOffset'
import isGenerator from './isGenerator'
import isInteger from './isInteger'
import isPromise from './isPromise'

const generatorReduceRight = function* (arrayLike, accum, iteratee, index) {
  if (isGenerator(accum)) {
    accum = yield* accum
  }
  while (index >= 0) {
    accum = iteratee(accum, arrayLike[index], index)
    if (isGenerator(accum)) {
      accum = yield* accum
    } else if (isPromise(accum)) {
      accum = yield accum
    }
    index -= 1
  }
  return accum
}

const doArrayLikeReduceRight = (arrayLike, accum, iteratee, index) => {
  if (isPromise(accum)) {
    return accum.then((resolvedAccum) =>
      doArrayLikeReduceRight(arrayLike, resolvedAccum, iteratee, index)
    )
  } else if (isGenerator(accum)) {
    return generatorReduceRight(arrayLike, accum, iteratee, index)
  }
  while (index >= 0) {
    accum = iteratee(accum, arrayLike[index], index)
    if (isPromise(accum)) {
      return accum.then((resolvedAccum) =>
        doArrayLikeReduceRight(arrayLike, resolvedAccum, iteratee, index - 1)
      )
    } else if (isGenerator(accum)) {
      return generatorReduceRight(arrayLike, accum, iteratee, index - 1)
    }
    index -= 1
  }
  return accum
}

/**
 * Reduces over an array like value from right to left
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {ArrayLike} arrayLike The array like value to iterate over.
 * @param {Function} iteratee The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.
 * @param {*} accum The accumulator value.
 * @param {number} index The index to start from
 * @returns {*} The final, accumulated value.
 */
const arrayLikeReduceRight = (arrayLike, accum, iteratee, index) => {
  const { length } = arrayLike
  index = isInteger(index) ? index : length - 1
  index = indexEndOffset(index, length)
  return doArrayLikeReduceRight(arrayLike, accum, iteratee, index)
}

export default arrayLikeReduceRight
