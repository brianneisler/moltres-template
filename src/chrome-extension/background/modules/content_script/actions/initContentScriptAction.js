import { actionBuilder } from '../../../../../utils/redux'
import { InitContentScriptAction } from '../schemas'

const initContentScriptAction = actionBuilder({
  Schema: InitContentScriptAction
})

export default initContentScriptAction
