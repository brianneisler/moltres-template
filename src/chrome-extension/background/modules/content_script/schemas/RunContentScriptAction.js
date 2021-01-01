import { Action, Integer, Object, String } from '../../../../../core/schemas'

const RunContentScriptAction = {
  name: 'content_script.RunContentScriptAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        filePath: String.schema.required(),
        frameId: Integer.schema.required(),
        tabId: Integer.schema.required()
      })
      .required()
  })
}

export default RunContentScriptAction
