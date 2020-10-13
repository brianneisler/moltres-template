import { curry, getPropertyOr } from '../../../../utils/lang'

import selectModal from './selectModal'

const selectModalVisible = curry((name, state) =>
  getPropertyOr(false, 'visible', selectModal(name, state))
)

export default selectModalVisible
