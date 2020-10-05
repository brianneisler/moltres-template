import { batchDeleteEntity } from '../../../core/sdk'
import { Page } from '../schemas'

const batchDeletePage = batchDeleteEntity(Page)

export default batchDeletePage
