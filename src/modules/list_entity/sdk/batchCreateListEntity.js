import { batchCreateEntity } from '../../../core/sdk'
import { ListEntity } from '../schemas'

const batchCreateListEntity = batchCreateEntity(ListEntity)

export default batchCreateListEntity
