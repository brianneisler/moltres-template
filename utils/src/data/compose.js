import { flatten, head, identity, init, last, length } from 'ramda'
import reduceRight from './reduceRight'

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

  return (...args) => reduceRight(
    (composed, func) => func(composed),
    lastFunc(...args),
    rest
  )
}

export default compose
