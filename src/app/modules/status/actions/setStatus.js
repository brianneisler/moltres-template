import { createAction } from '../../../../utils/redux'

const setStatus = createAction('STATUS:SET_STATUS', (name, status) => ({
  name,
  status
}))

export default setStatus
