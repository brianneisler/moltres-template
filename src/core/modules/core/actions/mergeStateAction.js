import { createAction } from 'redux-actions'

const mergeStateAction = createAction('MERGE_STATE', ({ path, state }) => ({
  path,
  state
}))

export default mergeStateAction
