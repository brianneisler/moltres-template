import isImmutable from './isImmutable'

const toPlain = (value) => {
  if (isImmutable(value)) {
    return value.toJSON()
  }
  return value
}

export default toPlain
