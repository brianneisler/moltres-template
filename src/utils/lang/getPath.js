import createPath from './createPath'
import curry from './curry'
import getProp from './getProp'
import isPath from './isPath'
import isString from './isString'
import isUndefined from './isUndefined'
import size from './size'

const getPath = curry((path, obj) => {
  if (isString(path)) {
    path = createPath(path)
  }
  if (!isPath(path)) {
    throw new TypeError(
      `getPath expected 'path' parameter to be a Path. Instead received ${path}`
    )
  }
  let val = obj
  let idx = 0
  const length = size(path)
  while (idx < length) {
    val = getProp(getProp(idx, path), val)
    if (isUndefined(val)) {
      return val
    }
    idx += 1
  }
  return val
})

export default getPath
