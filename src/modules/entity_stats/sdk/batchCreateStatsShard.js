import { batchCreateEntity } from 'moltres/core'
import { StatsShard } from '../schemas'

const batchCreateStatsShard = batchCreateEntity(StatsShard)

export default batchCreateStatsShard
