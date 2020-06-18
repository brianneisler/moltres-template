import { createAction } from '../../../../utils/redux'

const setModal = createAction('MODAL:SET_MODAL', (name, instance) => ({
  instance,
  name
}))

export default setModal
