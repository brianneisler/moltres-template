import { Action } from '../../action/schemas'
import { Object } from '../../core/schemas'

const UncaughtExceptionAction = {
  name: 'error.UncaughtExceptionAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        promise: Object.schema,
        reason: Object.schema.required(),
        saga: Object.schema
      })
      .required()
  })
}

export default UncaughtExceptionAction
