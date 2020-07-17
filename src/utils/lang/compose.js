import flatten from './flatten'
import identity from './identity'
import reduceRight from './reduceRight'

/**
 * Performs right-to-left function composition. The rightmost function may have any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @function
 * @since v0.1.0
 * @category common
 * @param {...Function} functions The functions to compose
 * @returns {Function}
 * @example
 *
 * const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 * const yellGreeting = compose(toUpper, classyGreeting)
 * yellGreeting('James', 'Bond')
 * //=> "THE NAME'S BOND, JAMES BOND"
 *
 * compose(Math.abs, add(1), multiply(2))(-4) //=> 7
 */
const compose = (...functions) => {
  functions = flatten(functions)
  const { length } = functions
  if (length === 0) {
    return identity
  }

  if (length === 1) {
    return functions[0]
  }

  const lastFunc = functions[length - 1]
  const rest = functions.slice(0, length - 1)

  return (...args) =>
    reduceRight((composed, func) => func(composed), lastFunc(...args), rest)
}

export default compose
