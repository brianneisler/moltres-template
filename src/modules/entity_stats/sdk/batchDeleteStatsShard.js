import { batchDeleteEntity } from '../../../core/sdk'
import { StatsShard } from '../schemas'

const batchDeleteStatsShard = batchDeleteEntity(StatsShard)

export default batchDeleteStatsShard
