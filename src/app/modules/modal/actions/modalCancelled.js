import { createAction } from 'redux-actions'

const modalCancelled = createAction('MODAL:CANCELLED', (name) => ({
  name
}))

export default modalCancelled
