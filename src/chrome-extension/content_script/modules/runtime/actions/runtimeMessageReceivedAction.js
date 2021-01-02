import { actionBuilder } from '../../../../../utils/redux'
import { RuntimeMessageReceivedAction } from '../schemas'

const runtimeMessageReceivedAction = actionBuilder({
  Schema: RuntimeMessageReceivedAction
})

export default runtimeMessageReceivedAction
