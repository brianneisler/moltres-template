import { Entity } from '../../Entity'
import EntityStats from './EntityStats'
import Joi from '@hapi/joi'

const StatsShard = {
  collectionName: 'StatsShards',
  idField: 'index',
  name: 'StatsShard',
  parentSchema: EntityStats,
  schema: Entity.keys({
    data: Joi.object().required(),
    index: Joi.number().integer().required()
  })
}

export default StatsShard
