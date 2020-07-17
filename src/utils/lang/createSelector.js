import any from './any'
import { ImmutableMap } from './classes'
import _containsWildcard from './containsWildcard'
import _findWildcards from './findWildcards'
import isArray from './isArray'
import map from './map'
import reduce from './reduce'
import _replaceWildcards from './replaceWildcards'
import _select from './select'
import weakMemoize from './weakMemoize'

const SELECT_DEFAULT = () => {
  throw new Error('select for wildcard selector is currently not implemented')
}

const createSelector = (selectors, reducer) => {
  if (!isArray(selectors)) {
    selectors = [selectors]
  }

  const containsWildcard = weakMemoize(() => any(_containsWildcard, selectors))

  const findWildcards = (wildcards = ImmutableMap({})) =>
    reduce(
      (accum, selector) => _findWildcards(selector, accum),
      wildcards,
      selectors
    )

  const replaceWildcards = (wildValues) =>
    createSelector(map(_replaceWildcards(wildValues), selectors), reducer)

  let select
  if (containsWildcard()) {
    select = SELECT_DEFAULT
  } else if (reducer) {
    reducer = weakMemoize(reducer)
    select = weakMemoize((state) => {
      const results = map((selector) => _select(selector, state), selectors)
      return reducer(...results)
    })
  } else {
    select = weakMemoize((state) => {
      const results = map((selector) => _select(selector, state), selectors)
      if (results.length === 1) {
        return results[0]
      }
      return results
    })
  }

  return {
    containsWildcard,
    findWildcards,
    reducer,
    replaceWildcards,
    select,
    selectors
  }
}

export default createSelector
