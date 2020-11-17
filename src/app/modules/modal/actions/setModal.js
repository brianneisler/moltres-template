import { createAction } from 'moltres/redux'

const setModal = createAction('MODAL:SET_MODAL', (name, instance) => ({
  instance,
  name
}))

export default setModal
