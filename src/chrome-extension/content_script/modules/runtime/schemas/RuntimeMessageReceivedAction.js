import { Action, Any, Object } from '../../../../../core/schemas'

const RuntimeMessageReceivedAction = {
  name: 'runtime.RuntimeMessageReceivedAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        message: Any.schema.required(),
        sender: Object.schema.required()
      })
      .required()
  })
}

export default RuntimeMessageReceivedAction
