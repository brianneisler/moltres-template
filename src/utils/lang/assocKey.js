import curry from './curry'
import isMap from './isMap'
import satisfiesKeyed from './satisfiesKeyed'
import { mapSetKey } from './util'

const assocKey = curry((selector, value, collection) => {
  if (!satisfiesKeyed(collection)) {
    throw new Error(
      `collection must be a Keyed value. Instead was given ${collection}`
    )
  }
  if (isMap(collection)) {
    return mapSetKey(collection, selector, value)
  }
  return collection.set(selector, value)
})

export default assocKey
