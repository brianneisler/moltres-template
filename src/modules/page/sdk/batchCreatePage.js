import { batchCreateEntity } from '../../../core/sdk'
import { Page } from '../schemas'

const batchCreatePage = batchCreateEntity(Page)

export default batchCreatePage
