import { Action } from '../../../../db/Action'
import Joi from '@hapi/joi'

const ResponseAction = {
  schema: Action.schema.keys({
    payload: Joi.object().keys({
      error: Joi.object(),
      redirect: Joi.string(),
      statusCode: Joi.number().integer().required()
    })
  }),
  type: 'ROUTER:RESPONSE'
}

export default ResponseAction
