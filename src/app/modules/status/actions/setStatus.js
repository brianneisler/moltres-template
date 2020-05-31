import { createAction } from 'redux-actions'

const setStatus = createAction('STATUS:SET_STATUS', (name, status) => ({
  name,
  status
}))

export default setStatus
