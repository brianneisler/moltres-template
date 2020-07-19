import { curry, getPropOr } from '../../../../utils/lang'

import selectModal from './selectModal'

const selectModalVisible = curry((name, state) =>
  getPropOr(false, 'visible', selectModal(name, state))
)

export default selectModalVisible
