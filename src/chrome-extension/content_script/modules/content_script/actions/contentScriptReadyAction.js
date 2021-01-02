import { actionBuilder } from '../../../../../utils/redux'
import { ContentScriptReadyAction } from '../schemas'

const contentScriptReadyAction = actionBuilder({
  Schema: ContentScriptReadyAction
})

export default contentScriptReadyAction
