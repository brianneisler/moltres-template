import assoc from './assoc'
import ImmutableList from './classes/ImmutableList'
import ImmutableMap from './classes/ImmutableMap'
import createPath from './createPath'
import first from './first'
import getProp from './getProp'
import hasProp from './hasProp'
import isImmutable from './isImmutable'
import isInteger from './isInteger'
import isNil from './isNil'
import isObject from './isObject'
import isString from './isString'
import size from './size'
import slice from './slice'

const getNextCollection = (collection, part, parts) => {
  if (part === '$') {
    return collection
  }
  if (
    !isNil(collection) &&
    hasProp(part, collection) &&
    isObject(getProp(part, collection))
  ) {
    return getProp(part, collection)
  }
  if (isNil(collection)) {
    return {}
  }
  if (isInteger(getProp(1, parts))) {
    if (isImmutable(collection)) {
      return new ImmutableList()
    }
    return []
  }
  if (isImmutable(collection)) {
    return new ImmutableMap()
  }
  return {}
}

const assocPath = (path, value, collection) => {
  if (isString(path)) {
    path = createPath(path)
  }
  if (size(path) === 0) {
    return value
  }
  const part = first(path)
  if (size(path) > 1) {
    const nextCollection = getNextCollection(collection, part, path)
    value = assocPath(slice(1, Infinity, path), value, nextCollection)
  }
  if (part === '$') {
    return value
  }
  return assoc(part, value, collection)
}

export default assocPath
