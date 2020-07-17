import { PushModalRouteAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const pushModalRouteAction = actionBuilder({
  Schema: PushModalRouteAction
})

export default pushModalRouteAction
