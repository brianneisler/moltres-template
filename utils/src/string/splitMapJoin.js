import curry from '../common/curry'
import join from '../data/join'
import map from '../data/map'
import split from './split'

const splitMapJoin = curry((fn, separator, value) =>
  join(separator, map(fn, split(separator, value)))
)

export default splitMapJoin
