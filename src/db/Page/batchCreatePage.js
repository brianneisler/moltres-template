import { Page } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreatePage = batchCreateEntity(Page)

export default batchCreatePage
