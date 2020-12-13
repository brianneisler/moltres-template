import { actionBuilder } from 'moltres/redux'
import { PushModalRouteAction } from '../schemas'

const pushModalRouteAction = actionBuilder({
  Schema: PushModalRouteAction
})

export default pushModalRouteAction
