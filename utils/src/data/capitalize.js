import upperFirst from './upperFirst'

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED')
 * // => 'Fred'
 */
const capitalize = (string) => upperFirst(string.toLowerCase())

export default capitalize
