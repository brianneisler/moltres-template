import { curry, getPath } from 'moltres/lang'

const selectModal = curry((name, state) =>
  getPath(['modal', 'instances', name], state)
)

export default selectModal
