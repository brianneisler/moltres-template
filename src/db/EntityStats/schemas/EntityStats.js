import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const EntityStats = {
  collectionName: 'EntityStats',
  indexes: [['entityType', 'entityId']],
  name: 'EntityStats',
  schema: Entity.keys({
    entityId: id().required(),
    entityType: Joi.string().required(),
    numberShards: Joi.number().integer().required()
  })
}

export default EntityStats
