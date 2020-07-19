import { batchCreateEntity } from '../Entity'

import { StatsShard } from './schemas'

const batchCreateStatsShard = batchCreateEntity(StatsShard)

export default batchCreateStatsShard
