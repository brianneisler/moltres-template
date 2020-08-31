import { actionBuilder } from '../../../../utils/redux'
import { UIInitializedAction } from '../schemas'

const uiInitializedAction = actionBuilder({
  Schema: UIInitializedAction
})

export default uiInitializedAction
