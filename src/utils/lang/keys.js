import indexes from './indexes'
import isFunction from './isFunction'
import properties from './properties'
import satisfiesIndexed from './satisfiesIndexed'
import satisfiesKeyed from './satisfiesKeyed'
import satisfiesPropertied from './satisfiesPropertied'
import { iteratorToArray } from './util'

const keys = (value) => {
  if (value && isFunction(value.keySeq)) {
    return value.keySeq().toList()
  }
  if (satisfiesKeyed(value)) {
    return iteratorToArray(value.keys())
  }
  if (satisfiesIndexed(value)) {
    return indexes(value)
  }
  if (satisfiesPropertied(value)) {
    return properties(value)
  }
  throw new Error(`Cannot `)
}

export default keys
