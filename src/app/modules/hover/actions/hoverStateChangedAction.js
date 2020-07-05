import { HoverStateChangedAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const hoverStateChangedAction = actionBuilder({
  Schema: HoverStateChangedAction
})

export default hoverStateChangedAction
