import { Integer, Object } from '../../../core/schemas'
import { Entity } from '../../Entity'

import EntityStats from './EntityStats'

const StatsShard = {
  collectionName: 'StatsShards',
  idField: 'index',
  name: 'StatsShard',
  // TODO BRN: Add parentRefIdField
  parentSchema: EntityStats,
  schema: Entity.schema.keys({
    data: Object.schema.required(),
    index: Integer.schema.required()
  })
}

export default StatsShard
