import { actionBuilder } from 'moltres/redux'
import { UIDeinitializedAction } from '../schemas'

const uiDeinitializedAction = actionBuilder({
  Schema: UIDeinitializedAction
})

export default uiDeinitializedAction
