import isArrayLike from './isArrayLike'
import isIterable from './isIterable'
import isIterator from './isIterator'
import isObjectLike from './isObjectLike'
import keys from './keys'

const symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator'

const arrayIterator = (value) => {
  let index = -1
  return {
    next: () => {
      if (index < value.length - 1) {
        index += 1
        return {
          value: value[index],
          done: false
        }
      }
      return {
        done: true
      }
    }
  }
}

const objectIterator = (object) => {
  const keyIterator = arrayIterator(keys(object))
  return {
    next: () => {
      const { done, value } = keyIterator.next()
      if (done) {
        return { done }
      }
      return {
        done,
        value: [value, object[value]]
      }
    }
  }
}

const iterator = (value) => {
  if (isIterator(value)) {
    return value
  }
  if (isIterable(value)) {
    return value[symIterator]()
  }
  if (isArrayLike(value)) {
    return arrayIterator(value)
  }
  if (isObjectLike(value)) {
    return objectIterator(value)
  }
  return arrayIterator([value])
}

export default iterator
