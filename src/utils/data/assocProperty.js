import { objectSetProperty } from './util'
import curry from './curry'
import satisfiesPropertied from './satisfiesPropertied'

const assocProperty = curry((property, value, collection) => {
  if (!satisfiesPropertied(collection)) {
    throw new Error(
      `collection must be a Propertied value. Instead was given ${collection}`
    )
  }
  return objectSetProperty(collection, property, value)
})

export default assocProperty
