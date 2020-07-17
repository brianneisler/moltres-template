import { curry, getPath } from '../../../utils/lang'

const selectModal = curry((name, state) =>
  getPath(['modal', 'instances', name], state)
)

export default selectModal
