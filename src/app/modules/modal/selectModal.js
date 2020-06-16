import { curry, getPath } from '../../../utils/data'

const selectModal = curry((name, state) =>
  getPath(['modal', 'instances', name], state)
)

export default selectModal
