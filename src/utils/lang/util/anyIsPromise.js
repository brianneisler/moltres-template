import anyIsFunction from './anyIsFunction'

/**
 * Checks whether the given value is a Promise.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a Promise, else `false`.
 * @example
 *
 * anyIsPromise(new Promise(() => {})) //=> true
 *
 * anyIsPromise({}) //=> false
 *
 * anyIsPromise({ then: () => {} }) //=> true
 */
const anyIsPromise = (any) => any != null && anyIsFunction(any.then)

export default anyIsPromise
