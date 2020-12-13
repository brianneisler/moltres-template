import { batchUpdateEntity } from 'moltres/core'
import { StatsShard } from '../schemas'

const batchUpdateStatsShard = batchUpdateEntity(StatsShard)

export default batchUpdateStatsShard
