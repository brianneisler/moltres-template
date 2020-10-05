import { Action } from '../../action/schemas'
import { Any, Object, String } from '../../core/schemas'

const SetContextAction = {
  name: 'context.SetContextAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        selector: String.schema,
        value: Any.schema
      })
      .required()
  })
}

export default SetContextAction
