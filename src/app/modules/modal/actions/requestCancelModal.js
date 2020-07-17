import { createAction } from '../../../../utils/redux'

const requestCancelModal = createAction('MODAL:REQUEST_CANCEL', (name) => ({
  name
}))

export default requestCancelModal
