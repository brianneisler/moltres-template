import curry from './curry'
import isArray from './isArray'
import isString from './isString'
import satisfiesIndexed from './satisfiesIndexed'
import { arraySetIndex, stringSetIndex } from './util'

const assocIndex = curry((index, value, collection) => {
  if (!satisfiesIndexed(collection)) {
    throw new Error(
      `collection must be an Indexed value. Instead was given ${collection}`
    )
  }
  if (isArray(collection)) {
    return arraySetIndex(collection, index, value)
  }
  if (isString(collection)) {
    return stringSetIndex(collection, index, value)
  }
  return collection.set(index, value)
})

export default assocIndex
