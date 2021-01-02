import { Action, Integer, Object } from '../../../../../core/schemas'

const SetTabChannelAction = {
  name: 'content_script.SetTabChannelAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        frameId: Integer.schema.required(),
        tabChannel: Object.schema.required(),
        tabId: Integer.schema.required()
      })
      .required()
  })
}

export default SetTabChannelAction
