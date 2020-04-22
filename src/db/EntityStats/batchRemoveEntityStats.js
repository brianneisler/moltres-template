import { EntityStats } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveEntityStats = batchRemoveEntity(EntityStats)

export default batchRemoveEntityStats
