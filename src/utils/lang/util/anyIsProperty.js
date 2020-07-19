import { Property } from '../classes'

import anyIsString from './anyIsString'
import anyIsSymbol from './anyIsSymbol'

/**
 * Checks if `any` is a Property
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {*} any The value to check.
 * @returns {boolean} Returns `true` if `any` is a Property, else `false`.
 * @example
 *
 * anyIsProperty('foo')
 * //=> true
 *
 * anyIsProperty('foo.bar')
 * //=> true
 *
 * anyIsProperty(Symbol('abc'))
 * //=> true
 *
 * anyIsProperty(Symbol.for('foo'))
 * //=> true
 *
 * anyIsProperty(new String('foo'))
 * //=> true
 *
 * anyIsProperty(123)
 * //=> false
 *
 * anyIsProperty(true)
 * //=> false
 *
 * anyIsProperty(null)
 * //=> false
 *
 * anyIsProperty(undefined)
 * //=> false
 *
 * anyIsProperty([])
 * //=> false
 *
 * anyIsProperty({})
 * //=> false
 */
const anyIsProperty = (any) =>
  anyIsSymbol(any) || anyIsString(any) || any instanceof Property

export default anyIsProperty
