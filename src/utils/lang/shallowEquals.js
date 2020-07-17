import curry from './curry'
import getProp from './getProp'
import hasProp from './hasProp'
import identical from './identical'
import keys from './keys'
import size from './size'

/**
 * Performs equality by iterating through keys on an object and returning false when any key has values which are not strictly equal between the arguments. Returns true when the values of all keys are strictly equal.
 *
 * @function
 * @since v0.1.0
 * @category data
 * @param {Array | String | Function} selector The property path to set or functional selector
 * @param {object} objA The object to compare to B
 * @param {object} objB The object to compare to A
 * @returns {boolean} Whether or not the two objects are shallowly equal
 * @example
 *
 * shallowEquals({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: undefined }) //=> true
 * shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }) //=> false
 */
const shallowEquals = curry((objA, objB) => {
  if (identical(objA, objB)) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = keys(objA)
  const keysB = keys(objB)

  if (size(keysA) !== size(keysB)) {
    return false
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasProp(getProp(i, keysA), objB) ||
      !identical(
        getProp(getProp(i, keysA), objA),
        getProp(getProp(i, keysA), objB)
      )
    ) {
      return false
    }
  }

  return true
})

export default shallowEquals
