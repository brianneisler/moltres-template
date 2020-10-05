import { Action } from '../../action/schemas'
import { Object, String } from '../../core/schemas'

const SetQueryCursorAction = {
  name: 'query.SetQueryCursorAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        cursor: Object.schema.required(),
        queryKey: String.schema.required()
      })
      .required()
  })
}

export default SetQueryCursorAction
