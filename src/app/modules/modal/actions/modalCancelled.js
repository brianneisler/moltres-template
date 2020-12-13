import { createAction } from 'moltres/redux'

const modalCancelled = createAction('MODAL:CANCELLED', (name) => ({
  name
}))

export default modalCancelled
