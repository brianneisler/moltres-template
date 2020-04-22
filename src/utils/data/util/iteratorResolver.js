import ITERATOR_END from '../constants/ITERATOR_END'
import ITERATOR_START from '../constants/ITERATOR_START'
import anyIsResolved from './anyIsResolved'
import anyResolveWith from './anyResolveWith'
import unresolvedResolveWith from './unresolvedResolveWith'

const iterateAt = (iterator, history, pending, index) => {
  if (history[index]) {
    return history[index]
  }
  if (pending[index]) {
    return pending[index]
  }
  const next = iterator.next()
  pending[index] = next
  history[index] = null
  return anyResolveWith(next, (resolvedNext) => {
    pending[index] = null
    if (!resolvedNext.done) {
      history[index] = resolvedNext
    }
    return resolvedNext
  })
}

const fastForward = (histIterator) => {
  let next = { done: false }
  while (!next.done) {
    next = histIterator.next()
    if (!anyIsResolved(next)) {
      return unresolvedResolveWith(next, (resolvedNext) => {
        if (!resolvedNext.done) {
          return fastForward(histIterator)
        }
        return histIterator
      })
    }
  }
  return histIterator
}

const iterAt = (index, history) => {
  if (index >= 0 && history[index]) {
    const iter = history[index]
    return {
      ...iter,
      index,
      kdx: index
    }
  }
  return {
    done: true
  }
}

const prevIterAt = (index, history) => {
  if (index >= 0 && history[index]) {
    const iter = history[index]
    return {
      ...iter,
      index,
      kdx: index
    }
  }
}

const historicIterator = (iterator, start = ITERATOR_START) => {
  const history = []
  const pending = []
  let index = 0

  const histIterator = {
    next: () => {
      const iter = iterateAt(iterator, history, pending, index)
      return anyResolveWith(iter, (resolvedIter) => {
        const prev = prevIterAt(index - 1, history)
        if (!resolvedIter.done) {
          resolvedIter = iterAt(index, history)
          index += 1
        }
        return {
          ...resolvedIter,
          prev
        }
      })
    },
    previous: () => {
      const iter = iterAt(index - 1, history)
      const prev = prevIterAt(index, history)
      if (index >= 0) {
        index -= 1
      }
      return {
        ...iter,
        prev
      }
    }
  }

  if (start === ITERATOR_END) {
    return fastForward(histIterator)
  }
  return histIterator
}

/**
 * Returns iterator capable of resolving iterators that might be async, wrapping it in additional functionality.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Iterator} iterator The iterator to wrap
 * @param {string} start The positin to start at.
 * @return {Iterator} A new iterator for the given iterator
 * @example
 *
 * iteratorResolver(
 *  (['write', 'more'])[Symbol.iterator]()
 * )
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
 */
const iteratorResolver = (iterator, start = ITERATOR_START) => {
  // NOTE BRN: Optimization here of reassigning histIterator so that we don't have to resolve it on every iteration.
  let histIterator
  histIterator = anyResolveWith(historicIterator(iterator, start), (resolvedIterator) => {
    histIterator = resolvedIterator
    return histIterator
  })

  // TODO BRN: Figure out a more efficient way of doing this rather than
  // resolving the iterator every time
  return {
    next: () => anyResolveWith(histIterator, (resolvedIterator) => resolvedIterator.next()),
    previous: () => anyResolveWith(histIterator, (resolvedIterator) => resolvedIterator.previous())
  }
}

export default iteratorResolver
