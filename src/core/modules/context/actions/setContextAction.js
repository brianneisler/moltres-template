import { createAction } from 'redux-actions'

const setContextAction = createAction('SET_CONTEXT', ({ selector, value }) => ({
  selector,
  value
}))

export default setContextAction
