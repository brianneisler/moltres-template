import { assoc as rAssoc } from 'ramda'
import curry from './curry'
import isFunction from './isFunction'

const assocProp = curry((selector, value, collection) => {
  if (collection && isFunction(collection.set)) {
    return collection.set(selector, value)
  }
  return rAssoc(selector, value, collection)
})

export default assocProp
