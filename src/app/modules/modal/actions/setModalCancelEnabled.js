import { createAction } from 'redux-actions'

const setModalCancelEnabled = createAction(
  'MODAL:SET_MODAL_CANCEL_ENABLED',
  (name, value) => ({
    name,
    value
  })
)

export default setModalCancelEnabled
