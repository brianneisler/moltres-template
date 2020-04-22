import curry from './curry'
import isArray from './isArray'
import isImmutable from './isImmutable'
import keys from './keys'
import pipe from './pipe'
import reduce from './reduce'

const map = curry((iteratee, collection) => {
  if (isImmutable(collection)) {
    return collection.map(iteratee)
  }
  return reduce(
    (accum, key) =>
      pipe(
        () => iteratee(collection[key], key, collection),
        (result) => {
          accum[key] = result
          return accum
        }
      )(),
    isArray(collection) ? [] : {},
    keys(collection)
  )
})

export default map
