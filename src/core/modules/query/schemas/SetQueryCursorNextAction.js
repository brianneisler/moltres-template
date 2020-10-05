import { Action } from '../../action/schemas'
import { Object, String } from '../../core/schemas'

const SetQueryCursorNextAction = {
  name: 'query.SetQueryCursorNextAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        cursor: Object.schema.required(),
        queryKey: String.schema.required()
      })
      .required()
  })
}

export default SetQueryCursorNextAction
