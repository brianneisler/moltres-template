import { createAction } from '../../../../utils/redux'

const setModalCancelEnabled = createAction(
  'MODAL:SET_MODAL_CANCEL_ENABLED',
  (name, value) => ({
    name,
    value
  })
)

export default setModalCancelEnabled
