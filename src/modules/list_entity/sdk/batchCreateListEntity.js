import { batchCreateEntity } from 'moltres/core'
import { ListEntity } from '../schemas'

const batchCreateListEntity = batchCreateEntity(ListEntity)

export default batchCreateListEntity
