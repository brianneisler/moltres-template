import { END, START } from '../constants/Iterator'

import indexEndOffset from './indexEndOffset'

const iterAt = (index, arrayLike) => {
  if (index < arrayLike.length && index >= 0) {
    return {
      done: false,
      index,
      kdx: index,
      value: arrayLike[index]
    }
  }
  return {
    done: true
  }
}

const prevIterAt = (index, arrayLike) => {
  if (index < arrayLike.length && index >= 0) {
    return {
      done: false,
      index,
      kdx: index,
      value: arrayLike[index]
    }
  }
}

/**
 * Returns iterator for an array like value.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} arrayLike The array like value to create an iterator for.
 * @param {*} index The index to start at.
 * @return {IndexedIterator} A new iterator for the given array like value
 * @example
 *
 * arrayLikeToIterator(['write', 'more'])
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   }),
 * //   previous: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 * arrayLikeToIterator('tests')
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * //   previous: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 */
const arrayLikeToIterator = (arrayLike, index = 0) => {
  if (index === END) {
    index = arrayLike.length
  } else if (index === START) {
    index = 0
  }
  index = indexEndOffset(index, arrayLike.length)
  let lastIndex

  return {
    getIndex: () => lastIndex,
    next: () => {
      const iter = iterAt(index, arrayLike)
      const prev = prevIterAt(index - 1, arrayLike)

      if (index < arrayLike.length) {
        lastIndex = index
        index += 1
      }
      return {
        ...iter,
        prev
      }
    },
    previous: () => {
      const iter = iterAt(index - 1, arrayLike)
      const prev = prevIterAt(index, arrayLike)
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

export default arrayLikeToIterator
