import anyIsFunction from './anyIsFunction'

/**
 * Checks whether the given value is a generator.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param  {*} any The value to check.
 * @returns {boolean} Returns `true` if `value` is a generator, else `false`.
 * @example
 *
 * anyIsGenerator((function*() {})())  //=> true
 *
 * anyIsGenerator((function() {})())   //=> false
 *
 * anyIsGenerator({
 *   next: () => {},
 *   throw: () => {}
 * })  //=> true
 */
const anyIsGenerator = (any) => any && anyIsFunction(any.next) && anyIsFunction(any.throw)

export default anyIsGenerator
