import { Action } from '../../action/schemas'
import { Object, String } from '../../core/schemas'

const ClearQueryAction = {
  name: 'query.ClearQueryAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        queryKey: String.schema.required()
      })
      .required()
  })
}

export default ClearQueryAction
