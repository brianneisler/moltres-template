import { Id } from '../../../core'
import { Timestamped } from '../../Timestamped'
import Joi from '@hapi/joi'

const Entity = Timestamped.keys({
  id: Id.schema,
  removedByEntityId: Joi.string().allow(null),
  removedByEntityType: Joi.string().valid('ServiceAccount', 'User').allow(null)
})

export default Entity
