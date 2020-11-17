import { createAction } from 'moltres/redux'

const setCurrentStatus = createAction(
  'STATUS:SET_CURRENT_STATUS',
  (status) => ({ status })
)

export default setCurrentStatus
