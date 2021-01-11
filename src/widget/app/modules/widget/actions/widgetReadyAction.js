import { actionBuilder } from '../../../../../utils/redux'
import { WidgetReadyAction } from '../schemas'

const widgetReadyAction = actionBuilder({
  Schema: WidgetReadyAction
})

export default widgetReadyAction
