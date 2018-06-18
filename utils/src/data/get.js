import curry from './curry'
import isMap from './isMap'
import prop from './prop'

const get = curry((key, value) =>
  isMap(value) ? value.get(key) : prop(key, value)
)

export default get
