import { batchCreateEntity } from '../Entity'

import { ListEntity } from './schemas'

const batchCreateListEntity = batchCreateEntity(ListEntity)

export default batchCreateListEntity
