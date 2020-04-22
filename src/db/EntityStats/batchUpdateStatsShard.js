import { StatsShard } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateStatsShard = batchUpdateEntity(StatsShard)

export default batchUpdateStatsShard
