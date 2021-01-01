import { Action, Integer, Object } from '../../../../../core/schemas'

const InitContentScriptAction = {
  name: 'content_script.InitContentScriptAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        frameId: Integer.schema.required(),
        tabId: Integer.schema.required()
      })
      .required()
  })
}

export default InitContentScriptAction
