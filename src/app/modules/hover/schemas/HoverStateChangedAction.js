import { Action, Boolean, Object } from 'moltres/core'

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
