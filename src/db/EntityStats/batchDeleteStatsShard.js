import { batchDeleteEntity } from '../Entity'

import { StatsShard } from './schemas'

const batchDeleteStatsShard = batchDeleteEntity(StatsShard)

export default batchDeleteStatsShard
