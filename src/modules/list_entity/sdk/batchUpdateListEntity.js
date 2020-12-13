import { batchUpdateEntity } from 'moltres/core'
import { ListEntity } from '../schemas'

const batchUpdateListEntity = batchUpdateEntity(ListEntity)

export default batchUpdateListEntity
