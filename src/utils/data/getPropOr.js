import curry from './curry'
import defaultTo from './defaultTo'
import getProp from './getProp'

const getPropOr = curry((_default, prop, value) =>
  defaultTo(_default, getProp(prop, value))
)

export default getPropOr
