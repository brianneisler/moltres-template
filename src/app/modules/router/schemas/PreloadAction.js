import { Action } from '../../../../db/Action'
import Joi from '@hapi/joi'

const PreloadAction = {
  schema: Action.schema.keys({
    payload: Joi.object().keys({
      first: Joi.boolean().required(),
      location: Joi.object().required(),
      previousLocation: Joi.object().allow(null).required()
    })
  }),
  type: 'ROUTER:PRELOAD'
}

export default PreloadAction
