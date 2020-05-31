import { createAction } from 'redux-actions'

const requestCancelModal = createAction('MODAL:REQUEST_CANCEL', (name) => ({
  name
}))

export default requestCancelModal
