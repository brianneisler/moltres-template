import { Action } from '../../action/schemas'
import { Object, String } from '../../core/schemas'

const SetQueryAction = {
  name: 'query.SetQueryAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        query: Object.schema.required(),
        queryKey: String.schema.required()
      })
      .required()
  })
}

export default SetQueryAction
