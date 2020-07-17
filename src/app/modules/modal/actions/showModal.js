import { createAction } from '../../../../utils/redux'

const showModal = createAction('MODAL:SHOW_MODAL', (name) => ({
  name
}))

export default showModal
