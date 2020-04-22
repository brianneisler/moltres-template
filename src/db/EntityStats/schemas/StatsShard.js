import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const StatsShard = {
  collectionName: 'StatsShards',
  idField: 'index',
  name: 'StatsShard',
  schema: Entity.keys({
    data: Joi.object().required(),
    index: Joi.number().integer().required()
  })
}

export default StatsShard
