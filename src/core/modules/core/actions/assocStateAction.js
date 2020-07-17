import { createAction } from '../../../../utils/redux'

const assocStateAction = createAction('ASSOC_STATE', ({ path, state }) => ({
  path,
  state
}))

export default assocStateAction
