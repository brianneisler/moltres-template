import { curry, keys, prop, reduce } from 'ramda'

const reduceObjectIndexed = curry((reducer, accum, obj) =>
  reduce((acc, key) => reducer(acc, prop(key, obj), key), accum, keys(obj))
)

export default reduceObjectIndexed
