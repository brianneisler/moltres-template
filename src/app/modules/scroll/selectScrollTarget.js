import { curry, getPath } from 'moltres/lang'

const selectScrollTarget = curry((name, state) =>
  getPath(['scroll', 'targets', name], state)
)

export default selectScrollTarget
