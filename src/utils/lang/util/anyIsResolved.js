import anyIsFunction from './anyIsFunction'
import anyIsGenerator from './anyIsGenerator'
import anyIsObject from './anyIsObject'
import anyIsOp from './anyIsOp'
import anyIsPromise from './anyIsPromise'

/**
 * Determines if `any` is a resolvable value.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any
 * @returns {boolean}
 * @example
 *
 * anyIsResolved({
 *   ['@@redux-saga/IO']: 'op'
 * })
 * //=> false
 *
 * anyIsResolved((function* () {})())
 * //=> false
 *
 * anyIsResolved(new Promise(() => {})))
 * //=> false
 *
 * anyIsResolved({ resolve: () => 'foo' })
 * //=> false
 *
 * anyIsResolved(null)
 * //=> true
 *
 * anyIsResolved(undefined)
 * //=> true
 *
 * anyIsResolved('abc')
 * //=> true
 */
const anyIsResolved = (any) =>
  !anyIsObject(any) ||
  !(
    anyIsPromise(any) ||
    anyIsFunction(any.resolve) ||
    anyIsGenerator(any) ||
    anyIsOp(any)
  )

export default anyIsResolved
