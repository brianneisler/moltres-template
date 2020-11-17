import { createAction } from 'moltres/redux'

const showOverlay = createAction('OVERLAY:SHOW_OVERLAY', (name, options) => ({
  name,
  options
}))

export default showOverlay
