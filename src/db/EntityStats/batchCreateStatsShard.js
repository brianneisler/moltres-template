import { StatsShard } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateStatsShard = batchCreateEntity(StatsShard)

export default batchCreateStatsShard
