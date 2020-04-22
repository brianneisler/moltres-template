import { createAction } from 'redux-actions'

const assocStateAction = createAction('ASSOC_STATE', ({ path, state }) => ({
  path,
  state
}))

export default assocStateAction
