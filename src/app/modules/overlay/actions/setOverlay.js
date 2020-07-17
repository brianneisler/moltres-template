import { createAction } from '../../../../utils/redux'

const setOverlay = createAction('OVERLAY:SET_OVERLAY', (name, instance) => ({
  instance,
  name
}))

export default setOverlay
