import { Page } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdatePage = batchUpdateEntity(Page)

export default batchUpdatePage
