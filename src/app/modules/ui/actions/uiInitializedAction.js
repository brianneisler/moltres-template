import { actionBuilder } from 'moltres/redux'
import { UIInitializedAction } from '../schemas'

const uiInitializedAction = actionBuilder({
  Schema: UIInitializedAction
})

export default uiInitializedAction
