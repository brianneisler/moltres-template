import { batchUpdateEntity } from '../Entity'

import { StatsShard } from './schemas'

const batchUpdateStatsShard = batchUpdateEntity(StatsShard)

export default batchUpdateStatsShard
