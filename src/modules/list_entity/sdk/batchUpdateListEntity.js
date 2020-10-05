import { batchUpdateEntity } from '../../../core/sdk'
import { ListEntity } from '../schemas'

const batchUpdateListEntity = batchUpdateEntity(ListEntity)

export default batchUpdateListEntity
