import Symbol from '../js/Symbol'

/**
 * The `Symbol.toStringTag` well-known symbol is a string valued property that
 * is used in the creation of the default string description of an object. It
 * is accessed internally by the
 * [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
 * method.
 *
 * @private
 * @type {Symbol}
 * @since v0.1.0
 * @category lang.constants
 */
const SYMBOL_TO_STRING_TAG = Symbol.toStringTag

export default SYMBOL_TO_STRING_TAG
