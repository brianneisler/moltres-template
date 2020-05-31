import { createAction } from 'redux-actions'

const hideModal = createAction('MODAL:HIDE_MODAL', (name) => ({
  name
}))

export default hideModal
