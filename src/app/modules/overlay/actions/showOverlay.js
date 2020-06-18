import { createAction } from '../../../../utils/redux'

const showOverlay = createAction('OVERLAY:SHOW_OVERLAY', (name, options) => ({
  name,
  options
}))

export default showOverlay
