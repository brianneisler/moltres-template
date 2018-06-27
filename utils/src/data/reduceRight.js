import isGenerator from './isGenerator'
import isPromise from './isPromise'
import slice from './slice'

const generatorReduceRight = function*(iteratee, accumulator, array) {
  if (isGenerator(accumulator) || isPromise(accumulator)) {
    accumulator = yield accumulator
  }
  let length = array == null ? 0 : array.length
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length)
    if (isGenerator(accumulator) || isPromise(accumulator)) {
      accumulator = yield accumulator
    }
  }
  return accumulator
}

const asyncReduceRight = async (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    accumulator = await accumulator
  }
  if (isGenerator(accumulator)) {
    return generatorReduceRight(iteratee, accumulator, array)
  }
  let length = array == null ? 0 : array.length
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length)
    if (isPromise(accumulator)) {
      accumulator = await accumulator
    }
    if (isGenerator(accumulator)) {
      return generatorReduceRight(iteratee, accumulator, slice(0, length, array))
    }
  }
  return accumulator
}

const reduceRight = (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    return asyncReduceRight(iteratee, accumulator, array)
  }
  if (isGenerator(accumulator)) {
    return generatorReduceRight(iteratee, accumulator, array)
  }
  let length = array == null ? 0 : array.length
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length)
    if (isPromise(accumulator)) {
      return asyncReduceRight(iteratee, accumulator, slice(0, length, array))
    }
    if (isGenerator(accumulator)) {
      return generatorReduceRight(iteratee, accumulator, slice(0, length, array))
    }
  }
  return accumulator
}

export default reduceRight
