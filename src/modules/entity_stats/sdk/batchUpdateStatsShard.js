import { batchUpdateEntity } from '../../../core/sdk'
import { StatsShard } from '../schemas'

const batchUpdateStatsShard = batchUpdateEntity(StatsShard)

export default batchUpdateStatsShard
