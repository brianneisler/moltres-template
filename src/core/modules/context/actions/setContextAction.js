import { createAction } from '../../../../utils/redux'

const setContextAction = createAction('SET_CONTEXT', ({ selector, value }) => ({
  selector,
  value
}))

export default setContextAction
