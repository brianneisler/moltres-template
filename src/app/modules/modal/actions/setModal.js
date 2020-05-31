import { createAction } from 'redux-actions'

const setModal = createAction('MODAL:SET_MODAL', (name, instance) => ({
  instance,
  name
}))

export default setModal
