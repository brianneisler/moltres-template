import { actionBuilder } from '../../../../../utils/redux'
import { WebNavigationCompletedAction } from '../schemas'

const webNavigationCompletedAction = actionBuilder({
  Schema: WebNavigationCompletedAction
})

export default webNavigationCompletedAction
