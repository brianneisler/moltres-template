import { curry, getPath } from 'moltres/lang'

const selectOverlay = curry((name, state) =>
  getPath(['overlay', 'instances', name], state)
)

export default selectOverlay
