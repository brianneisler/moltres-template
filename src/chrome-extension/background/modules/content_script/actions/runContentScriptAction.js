import { actionBuilder } from '../../../../../utils/redux'
import { RunContentScriptAction } from '../schemas'

const runContentScriptAction = actionBuilder({
  Schema: RunContentScriptAction
})

export default runContentScriptAction
