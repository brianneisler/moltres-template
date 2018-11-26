import getProp from './getProp'
import isResolvable from '../saga/isResolvable'
import iterator from './iterator'
import resolveWith from '../saga/resolveWith'

const getDone = getProp('done')
const getValue = getProp('value')

const resolveNext = (next, fn, iter, recur) =>
  resolveWith((resolvedNext) => {
    if (getDone(resolvedNext)) {
      return getValue(resolvedNext)
    }
    return recur(fn, iter)
  }, next)

const doSeriesIteration = (fn, iter) => {
  while (true) {
    let next = iter.next()
    if (isResolvable(next)) {
      return resolveWith((resolvedNext) => {
        next = fn(resolvedNext)
        if (isResolvable(next)) {
          return resolveNext(next, fn, iter, doSeriesIteration)
        }
        if (getDone(next)) {
          return getValue(next)
        }
        return doSeriesIteration(fn, iter)
      }, next)
    }
    next = fn(next)
    if (isResolvable(next)) {
      return resolveNext(next, fn, iter, doSeriesIteration)
    }
    if (getDone(next)) {
      return getValue(next)
    }
  }
}

/**
 * This method iterates over the given collection or iterator in series. If the iterate method Returns
 * done: true then the iteration will complete
 *
 * @func
 * @param {Function} fn The iteratee Function
 * @param  {*} collection The collection or iterator to iterate over
 * @returns {*} the final value returned when the iteratee returns done or undefined
 * @example
 *
 * iterate((value, kdx) => {
 *   if (value === 'b') {
 *     return { done: true, value: kdx }
 *   }
 *   return { done: false }
 * }, ['a', 'b', 'c'])
 * //=> 1
 */
const iterate = (fn, collection) => doSeriesIteration(fn, iterator(collection))

export default iterate
