import { batchDeleteEntity } from '../Entity'

import { ListEntity } from './schemas'

const batchDeleteListEntity = batchDeleteEntity(ListEntity)

export default batchDeleteListEntity
