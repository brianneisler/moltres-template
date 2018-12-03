/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a transformer, else `false`.
 * @example
 *
 * isTransformer({
 *   ['@@transducer/step']: () => {}
 * }) // => true
 *
 * isTransformer('abc') // => false
 */
const isTransformer = (value) => value != null && typeof value['@@transducer/step'] === 'function'

export default isTransformer
