import { Action, Integer, Object } from '../../../../../core/schemas'

const ContentScriptReadyAction = {
  name: 'content_script.ContentScriptReadyAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        frameId: Integer.schema.required(),
        tabId: Integer.schema.required()
      })
      .required()
  })
}

export default ContentScriptReadyAction
