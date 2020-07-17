import { Entity } from '../../Entity'
import { Integer, Object } from '../../../core/schemas'
import EntityStats from './EntityStats'

const StatsShard = {
  collectionName: 'StatsShards',
  idField: 'index',
  name: 'StatsShard',
  parentSchema: EntityStats,
  schema: Entity.schema.keys({
    data: Object.schema.required(),
    index: Integer.schema.required()
  })
}

export default StatsShard
