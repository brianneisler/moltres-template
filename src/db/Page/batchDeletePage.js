import { Page } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeletePage = batchDeleteEntity(Page)

export default batchDeletePage
