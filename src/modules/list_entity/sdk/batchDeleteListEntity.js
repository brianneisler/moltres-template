import { batchDeleteEntity } from 'moltres/core'
import { ListEntity } from '../schemas'

const batchDeleteListEntity = batchDeleteEntity(ListEntity)

export default batchDeleteListEntity
