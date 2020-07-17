import String from '../classes/String'

const { substring } = String.prototype

/**
 * Returns the part of the string between the start and end indexes, or to the end of the string.
 *
 * Note: known bugs with the `String.prototype.substring` method or lack of support are addressed using the core-js polyfill provided by babel
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {string} string The string to get a substring of
 * @param {number} indexStart The index of the first character to include in the returned substring.
 * @param {number} indexEnd The index of the first character to exclude from the returned substring.
 * @returns {string} A new string containing the specified part of the given string.
 * @example
 *
 * stringSubstring('abc', 0, 1)
 * //=> 'a'
 *
 * stringSubstring('abc', 1)
 * //=> 'bc'
 */
const stringSubstring = (string, indexStart, indexEnd) =>
  substring.call(string, indexStart, indexEnd)

export default stringSubstring
