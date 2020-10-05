import { Action } from '../../action/schemas'
import { Object, String } from '../../core/schemas'

const NextPageAction = {
  name: 'query.NextPageAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        queryKey: String.schema.required()
      })
      .required()
  })
}

export default NextPageAction
