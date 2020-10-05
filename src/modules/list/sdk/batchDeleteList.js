import { batchDeleteEntity } from '../../../core/sdk'
import { List } from '../schemas'

const batchDeleteList = batchDeleteEntity(List)

export default batchDeleteList
