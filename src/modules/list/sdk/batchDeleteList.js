import { batchDeleteEntity } from 'moltres/core'
import { List } from '../schemas'

const batchDeleteList = batchDeleteEntity(List)

export default batchDeleteList
