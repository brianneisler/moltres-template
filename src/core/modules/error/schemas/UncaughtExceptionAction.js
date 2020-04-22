// NOTE BRN: We import directly from the schemas because otherwise this creates
// a circular reference and doesn't resolve properly
import { Action } from '../../../../db/Action/schemas'
import Joi from '@hapi/joi'

const UncaughtExceptionAction = {
  name: 'error.UncaughtExceptionAction',
  schema: Action.schema.keys({
    payload: Joi.object()
      .keys({
        promise: Joi.object(),
        reason: Joi.object().required(),
        saga: Joi.object()
      })
      .required()
  })
}

export default UncaughtExceptionAction
