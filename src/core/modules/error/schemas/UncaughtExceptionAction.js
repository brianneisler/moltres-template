// NOTE BRN: We import directly from the schemas because otherwise this creates
// a circular reference and doesn't resolve properly
import { Action } from '../../../../db/Action/schemas'
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
