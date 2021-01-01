import {
  Action,
  Integer,
  Number,
  Object,
  String
} from '../../../../../core/schemas'

const WebNavigationCompletedAction = {
  name: 'web_navigation.WebNavigationCompletedAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        frameId: Integer.schema,
        parentFrameId: Integer.schema,
        processId: Integer.schema,
        tabId: Integer.schema,
        timeStamp: Number.schema,
        url: String.schema
      })
      .required()
  })
}

export default WebNavigationCompletedAction
