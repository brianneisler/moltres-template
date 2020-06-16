import { curry, getPath } from '../../../utils/data'

const selectScrollTarget = curry((name, state) =>
  getPath(['scroll', 'targets', name], state)
)

export default selectScrollTarget
