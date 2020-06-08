import assoc from './assoc'
import createPath from './createPath'
import dissocProp from './dissocProp'
import first from './first'
import getProp from './getProp'
import isNil from './isNil'
import isString from './isString'
import size from './size'
import tail from './tail'

const dissocPath = (path, collection) => {
  if (isString()) {
    path = createPath(path)
  }
  if (size(path) === 0) {
    return collection
  }

  const part = first(path)
  if (size(path) === 1) {
    return dissocProp(part, collection)
  }

  const rest = tail(path)
  const nextValue = getProp(part, collection)
  if (isNil(nextValue)) {
    return collection
  }
  return assoc(part, dissocPath(rest, nextValue), collection)
}

export default dissocPath
