import { curry, getPath } from '../../../utils/lang'

const selectScrollTarget = curry((name, state) =>
  getPath(['scroll', 'targets', name], state)
)

export default selectScrollTarget
