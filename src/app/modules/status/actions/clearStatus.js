import { createAction } from 'redux-actions'

const clearStatus = createAction('STATUS:CLEAR_STATUS', (name) => ({ name }))

export default clearStatus
