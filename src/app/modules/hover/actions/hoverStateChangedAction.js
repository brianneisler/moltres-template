import { actionBuilder } from 'moltres/redux'
import { HoverStateChangedAction } from '../schemas'

const hoverStateChangedAction = actionBuilder({
  Schema: HoverStateChangedAction
})

export default hoverStateChangedAction
