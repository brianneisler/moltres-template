import curry from './curry'
import join from './join'
import map from './map'
import split from './split'

const splitMapJoin = curry((fn, separator, value) =>
  join(separator, map(fn, split(separator, value)))
)

export default splitMapJoin
