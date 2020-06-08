import { arrayProperties, objectProperties } from './util'
import isArray from './isArray'
import satisfiesPropertied from './satisfiesPropertied'

const properties = (value) => {
  if (satisfiesPropertied(value)) {
    if (isArray(value)) {
      return arrayProperties(value)
    }
    return objectProperties(value)
  }
  throw new Error(`value is not Indexed ${value}`)
}

export default properties
