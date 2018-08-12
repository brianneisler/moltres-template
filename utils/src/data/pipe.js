import flatten from './flatten'
import head from './head'
import identity from './identity'
import length from './length'
import reduce from './reduce'
import tail from './tail'

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @example
 *
 *      const f = pipe(Math.pow, negate, inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
const pipe = (...funcs) => {
  funcs = flatten(funcs)
  const size = length(funcs)
  if (size === 0) {
    return identity
  }

  if (size === 1) {
    return head(funcs)
  }

  const firstFunc = head(funcs)
  const rest = tail(funcs)

  return (...args) => reduce((piped, func) => func(piped), firstFunc(...args), rest)
}

export default pipe
