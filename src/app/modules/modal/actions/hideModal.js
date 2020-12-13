import { createAction } from 'moltres/redux'

const hideModal = createAction('MODAL:HIDE_MODAL', (name) => ({
  name
}))

export default hideModal
