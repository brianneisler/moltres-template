import { map } from 'ramda'
import isSymbol from './isSymbol'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/** Used to convert symbols to primitives and strings. */
const symbolProto = Symbol ? Symbol.prototype : undefined
const symbolToString = symbolProto ? symbolProto.toString : undefined

const toString = (value) => {
  if (value == null) {
    return ''
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${map((other) => other == null ? other : toString(other), value)}`
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default toString
