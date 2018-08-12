import flatten from './flatten'
import head from './head'
import identity from './identity'
import init from './init'
import last from './last'
import length from './length'
import reduceRight from './reduceRight'

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      compose(Math.abs, add(1), multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
const compose = (...funcs) => {
  funcs = flatten(funcs)
  const size = length(funcs)
  if (size === 0) {
    return identity
  }

  if (size === 1) {
    return head(funcs)
  }

  const lastFunc = last(funcs)
  const rest = init(funcs)

  return (...args) => reduceRight((composed, func) => func(composed), lastFunc(...args), rest)
}

export default compose
