import { Action, Integer, Object, String } from 'moltres/core'

const ResponseAction = {
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      error: Object.schema,
      redirect: String.schema,
      statusCode: Integer.schema.required()
    })
  }),
  type: 'ROUTER:RESPONSE'
}

export default ResponseAction
