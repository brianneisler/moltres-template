import assocIndex from './assocIndex'
import assocKey from './assocKey'
import assocProperty from './assocProperty'
import curry from './curry'
import satisfiesIndexed from './satisfiesIndexed'
import satisfiesKeyed from './satisfiesKeyed'
import satisfiesPropertied from './satisfiesPropertied'

const assoc = curry((selector, value, collection) => {
  if (satisfiesIndexed(collection)) {
    return assocIndex(selector, value, collection)
  }
  if (satisfiesKeyed(collection)) {
    return assocKey(selector, value, collection)
  }
  if (satisfiesPropertied(collection)) {
    return assocProperty(selector, value, collection)
  }
  throw new Error(`Cannot assoc to the given collection ${collection}`)
})

export default assoc
