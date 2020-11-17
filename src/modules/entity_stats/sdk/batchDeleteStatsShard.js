import { batchDeleteEntity } from 'moltres/core'
import { StatsShard } from '../schemas'

const batchDeleteStatsShard = batchDeleteEntity(StatsShard)

export default batchDeleteStatsShard
