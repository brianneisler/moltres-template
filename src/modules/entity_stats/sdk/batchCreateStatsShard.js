import { batchCreateEntity } from '../../../core/sdk'
import { StatsShard } from '../schemas'

const batchCreateStatsShard = batchCreateEntity(StatsShard)

export default batchCreateStatsShard
