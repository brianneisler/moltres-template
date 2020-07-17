import { Page } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemovePage = batchRemoveEntity(Page)

export default batchRemovePage
