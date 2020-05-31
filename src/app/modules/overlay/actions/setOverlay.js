import { createAction } from 'redux-actions'

const setOverlay = createAction('OVERLAY:SET_OVERLAY', (name, instance) => ({
  instance,
  name
}))

export default setOverlay
