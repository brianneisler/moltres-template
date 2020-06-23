import RegExp from '../classes/RegExp'

/**
 * Used to detect unsigned integer values.
 *
 * @private
 * @type {RegExp}
 * @since v0.1.0
 * @category lang.constants.Regex
 */
export const UINT = RegExp(`^(?:0|[1-9]\\d*)$`)
