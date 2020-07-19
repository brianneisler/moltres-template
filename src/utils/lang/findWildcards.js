import assoc from './assoc'
import { ImmutableMap } from './classes'
import createPath from './createPath'
import equals from './equals'
import getProp from './getProp'
import isFunction from './isFunction'
import isSelector from './isSelector'
import isWildcard from './isWildcard'
import reduce from './reduce'
import slice from './slice'

const findWildcards = (selector, wildcards = ImmutableMap([])) => {
  if (isFunction(selector)) {
    return wildcards
  }
  if (isSelector(selector)) {
    return selector.findWildcards(wildcards)
  }
  selector = createPath(selector)
  return reduce(
    (accum, name, index) => {
      if (isWildcard(name)) {
        const basePath = slice(0, index, selector)
        const existing = getProp(name, accum)
        if (existing) {
          if (!equals(getProp('basePath', existing), basePath)) {
            throw new Error(
              `wild cards with the same name must have the same basePath`
            )
          }
        } else {
          return assoc(
            name,
            ImmutableMap({
              basePath,
              name
            }),
            accum
          )
        }
      }
      return accum
    },
    wildcards,
    selector
  )
}

export default findWildcards
