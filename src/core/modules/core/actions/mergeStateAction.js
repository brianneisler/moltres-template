import { createAction } from '../../../../utils/redux'

const mergeStateAction = createAction('MERGE_STATE', ({ path, state }) => ({
  path,
  state
}))

export default mergeStateAction
