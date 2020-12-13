import { curry, getPropertyOr } from 'moltres/lang'

import selectModal from './selectModal'

const selectModalVisible = curry((name, state) =>
  getPropertyOr(false, 'visible', selectModal(name, state))
)

export default selectModalVisible
