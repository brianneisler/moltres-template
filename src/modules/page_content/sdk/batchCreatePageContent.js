import { batchCreateEntity } from '../../../core/sdk'
import { PageContent } from '../schemas'

const batchCreatePageContent = batchCreateEntity(PageContent)

export default batchCreatePageContent
