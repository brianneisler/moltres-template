import isIterable from './isIterable'
import isString from './isString'
import toArray from './toArray'
import toPath from './toPath'

const createPath = (value) => {
  if (isString(value)) {
    return toPath(value)
  }
  if (isIterable(value)) {
    return toPath(toArray(value))
  }
  throw new Error(`cannot convert the given value into a Path ${value}`)
}

export default createPath
