import { Action, Integer, Object, String } from '../../../../../core/schemas'

const SetTabChannelAction = {
  name: 'content_script.SetTabChannelAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        frameId: Integer.schema.required(),
        tabChannel: String.schema.required(),
        tabId: Integer.schema.required()
      })
      .required()
  })
}

export default SetTabChannelAction
