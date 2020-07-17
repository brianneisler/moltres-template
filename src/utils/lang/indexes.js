import isArray from './isArray'
import isString from './isString'
import satisfiesIndexed from './satisfiesIndexed'
import {
  arrayIndexIterator,
  iteratorToArray,
  stringIndexIterator
} from './util'

const indexes = (value) => {
  if (satisfiesIndexed(value)) {
    if (isArray(value)) {
      return iteratorToArray(arrayIndexIterator(value))
    }
    if (isString(value)) {
      return iteratorToArray(stringIndexIterator(value))
    }
    return value.keySeq().toList()
  }
  throw new Error(`value is not Indexed ${value}`)
}

export default indexes
