import { Action, Boolean, Object } from '../../../../core/schemas'

const HoverStateChangedAction = {
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        isEnabled: Boolean.schema
      })
      .required()
  }),
  type: 'hover.HoverStateChangedAction'
}

export default HoverStateChangedAction
