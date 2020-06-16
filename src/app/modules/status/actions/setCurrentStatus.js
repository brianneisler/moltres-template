import { createAction } from 'redux-actions'

const setCurrentStatus = createAction(
  'STATUS:SET_CURRENT_STATUS',
  (status) => ({ status })
)

export default setCurrentStatus
