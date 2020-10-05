import { batchDeleteEntity } from '../../../core/sdk'
import { ListEntity } from '../schemas'

const batchDeleteListEntity = batchDeleteEntity(ListEntity)

export default batchDeleteListEntity
