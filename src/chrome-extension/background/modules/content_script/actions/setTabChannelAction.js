import { actionBuilder } from '../../../../../utils/redux'
import { SetTabChannelAction } from '../schemas'

const setTabChannelAction = actionBuilder({
  Schema: SetTabChannelAction
})

export default setTabChannelAction
