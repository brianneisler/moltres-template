/**
 * The JavaScript Array object is a global object that is used in the construction of arrays; which are high-level, list-like objects.
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util.js
 * @param {number | ...*} arrayLength If the only argument passed to the Array constructor is an integer between 0 and 232-1 (inclusive), this returns a new JavaScript array with its length property set to that number (Note: this implies an array of arrayLength empty slots, not slots with actual undefined values). If the argument is any other number, a RangeError exception is thrown.
 * @returns {Array} A new array
 * @example
 */
const _Array = Array

export default _Array
