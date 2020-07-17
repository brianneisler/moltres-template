import { createAction } from '../../../../utils/redux'

const clearStatus = createAction('STATUS:CLEAR_STATUS', (name) => ({ name }))

export default clearStatus
