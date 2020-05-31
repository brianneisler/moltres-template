import { createAction } from 'redux-actions'

const showOverlay = createAction('OVERLAY:SHOW_OVERLAY', (name, options) => ({
  name,
  options
}))

export default showOverlay
