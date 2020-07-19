import assoc from './assoc'
import { ImmutableList, ImmutableMap } from './classes'
import concat from './concat'
import containsWildcard from './containsWildcard'
import curry from './curry'
import findWildcards from './findWildcards'
import getPath from './getPath'
import getProp from './getProp'
import head from './head'
import isFunction from './isFunction'
import isNil from './isNil'
import isObject from './isObject'
import keys from './keys'
import map from './map'
import reduce from './reduce'
import replaceWildcards from './replaceWildcards'
import size from './size'
import sort from './sort'
import tail from './tail'
import toStringPath from './toStringPath'
import values from './values'

const sortWildcards = (wildcards) =>
  sort(
    (itemA, itemB) =>
      toStringPath(getProp('basePath', itemA)) >
      toStringPath(getProp('basePath', itemB)),
    values(wildcards)
  )

const reduceWildcard = (wildcards, wildValues, results, state) => {
  if (size(wildcards) === 0) {
    return results
  }
  const wildcard = head(wildcards)
  let basePath = getProp('basePath', wildcard)
  const name = getProp('name', wildcard)
  if (containsWildcard(basePath)) {
    try {
      basePath = replaceWildcards(wildValues, basePath)
    } catch (error) {
      if (error.message.contains('wildValues missing')) {
        return results
      }
      throw error
    }
  }
  const value = getPath(basePath, state)
  if (size(wildcards) === 1) {
    if (isNil(value)) {
      // if (!isEmpty(wildValues)) {
      //   return append(wildValues, results)
      // }
      return results
    }
    if (!isObject(value) || isFunction(value)) {
      throw new Error(
        `Wildcard path used on non object value - basePath: ${basePath} value: ${value}`
      )
    }
    return concat(
      results,
      map((wildValue) => assoc(name, wildValue, wildValues), keys(value))
    )
  }

  return reduce(
    (accum, wildValue) =>
      reduceWildcard(
        tail(wildcards),
        assoc(name, wildValue, wildValues),
        accum,
        state
      ),
    results,
    keys(value)
  )
}

const selectWildcards = curry((selector, state) => {
  const wildcards = sortWildcards(findWildcards(selector))
  const wildValues = ImmutableMap({})
  const results = ImmutableList([])
  return reduceWildcard(wildcards, wildValues, results, state)
})

export default selectWildcards
