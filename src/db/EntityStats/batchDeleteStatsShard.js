import { StatsShard } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteStatsShard = batchDeleteEntity(StatsShard)

export default batchDeleteStatsShard
