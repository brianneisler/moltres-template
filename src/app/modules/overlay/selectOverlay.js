import { curry, getPath } from '../../../utils/lang'

const selectOverlay = curry((name, state) =>
  getPath(['overlay', 'instances', name], state)
)

export default selectOverlay
