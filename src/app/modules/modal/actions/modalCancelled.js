import { createAction } from '../../../../utils/redux'

const modalCancelled = createAction('MODAL:CANCELLED', (name) => ({
  name
}))

export default modalCancelled
