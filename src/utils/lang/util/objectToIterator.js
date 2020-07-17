import { END, START } from '../constants/Iterator'

import reflectOwnKeys from './reflectOwnKeys'

const iterAt = (index, keys, object) => {
  if (index < keys.length && index >= 0) {
    const key = keys[index]
    return {
      done: false,
      kdx: key,
      key,
      value: object[key]
    }
  }
  return {
    done: true
  }
}

const prevIterAt = (index, keys, object) => {
  if (index < keys.length && index >= 0) {
    const key = keys[index]
    return {
      done: false,
      kdx: key,
      key,
      value: object[key]
    }
  }
}

/**
 * Returns iterator for an object's keys and values.
 *
 * Note, iterates over object's own keys and symbols
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} object The array object to create an iterator for.
 * @return {Iterator} A new iterator for the given object's keys and values
 * @example
 *
 * const iter = objectToIterator({
 *   write: 'more',
 *   tests: 'asap',
 *   [Symbol('like')]: 'now'
 * })
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: string,
 * //     key: string
 * //   })
 * // }
 *
 * iter.next()
 * //=> { value: 'more', key: 'write', kdx: 'write', done: false }
 *
 * iter.next()
 * //=> { value: 'asap', key: 'tests', kdx: 'tests', done: false }
 *
 * iter.next()
 * //=> { value: 'now', key: Symbol('like'), kdx: Symbol('like'), done: false }
 *
 * iter.next()
 * //=> { done: true }
 */
const objectToIterator = (object, start = START) => {
  const keys = reflectOwnKeys(object)
  let index = 0
  let lastIndex

  if (start === END) {
    index = keys.length
  }

  return {
    getKey: () => keys[lastIndex],
    next: () => {
      const iter = iterAt(index, keys, object)
      const prev = prevIterAt(index - 1, keys, object)
      if (index < keys.length) {
        lastIndex = index
        index += 1
      }
      return {
        ...iter,
        prev
      }
    },
    previous: () => {
      const iter = iterAt(index - 1, keys, object)
      const prev = prevIterAt(index, keys, object)
      if (index >= 0) {
        lastIndex = index - 1
        index -= 1
      }
      return {
        ...iter,
        prev
      }
    }
  }
}

export default objectToIterator
