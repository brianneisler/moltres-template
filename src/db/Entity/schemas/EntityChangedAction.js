import { Action } from '../../Action'
import Joi from '@hapi/joi'

const EntityChangedAction = {
  schema: Action.schema.keys({
    meta: Joi.object().keys({
      causedByEntityId: Joi.string().allow(null).required(),
      causedByEntityType: Joi.string().allow(null).required()
    }),
    payload: Joi.object().keys({
      changeType: Joi.string().required(),
      data: Joi.object().allow(null).required(),
      entityId: Joi.string().required(),
      entityPath: Joi.string().required(),
      entityType: Joi.string().required(),
      prevData: Joi.object().allow(null).required()
    })
  }),
  type: 'ENTITY_CHANGED'
}

export default EntityChangedAction
