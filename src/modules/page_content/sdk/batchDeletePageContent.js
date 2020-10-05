import { batchDeleteEntity } from '../../../core/sdk'
import { PageContent } from '../schemas'

const batchDeletePageContent = batchDeleteEntity(PageContent)

export default batchDeletePageContent
