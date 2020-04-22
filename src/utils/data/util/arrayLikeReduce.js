import anyIsGenerator from './anyIsGenerator'
import anyIsPromise from './anyIsPromise'
import indexEndOffset from './indexEndOffset'

const generatorReduce = function* (arrayLike, accum, iteratee, index) {
  if (anyIsGenerator(accum)) {
    accum = yield* accum
  }
  const { length } = arrayLike
  while (index < length) {
    accum = iteratee(accum, arrayLike[index], index)
    if (anyIsGenerator(accum)) {
      accum = yield* accum
    } else if (anyIsPromise(accum)) {
      accum = yield accum
    }
    index += 1
  }
  return accum
}

const baseArrayLikeReduce = (arrayLike, accum, iteratee, index = 0) => {
  const { length } = arrayLike
  if (anyIsPromise(accum)) {
    return accum.then((resolvedAccum) =>
      baseArrayLikeReduce(arrayLike, resolvedAccum, iteratee, index)
    )
  } else if (anyIsGenerator(accum)) {
    return generatorReduce(arrayLike, accum, iteratee, index)
  }
  while (index < length) {
    accum = iteratee(accum, arrayLike[index], index)
    if (anyIsPromise(accum)) {
      return accum.then((resolvedAccum) =>
        baseArrayLikeReduce(arrayLike, resolvedAccum, iteratee, index + 1)
      )
    } else if (anyIsGenerator(accum)) {
      return generatorReduce(arrayLike, accum, iteratee, index + 1)
    }
    index += 1
  }
  return accum
}

/**
 * Reduces over an `ArrayLike` value
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
const arrayLikeReduce = (arrayLike, accum, iteratee, index = 0) => {
  const { length } = arrayLike
  index = indexEndOffset(index, length)
  return baseArrayLikeReduce(arrayLike, accum, iteratee, index)
}

export default arrayLikeReduce
