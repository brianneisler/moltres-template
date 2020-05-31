import { createAction } from 'redux-actions'

const showModal = createAction('MODAL:SHOW_MODAL', (name) => ({
  name
}))

export default showModal
