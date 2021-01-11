import { Action, Integer, Object } from '../../../../../core/schemas'

const WidgetReadyAction = {
  name: 'widget.WidgetReadyAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        frameId: Integer.schema.required(),
        tabId: Integer.schema.required()
      })
      .required()
  })
}

export default WidgetReadyAction
