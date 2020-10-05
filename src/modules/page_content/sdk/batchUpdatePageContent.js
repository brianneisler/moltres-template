import { batchUpdateEntity } from '../../../core/sdk'
import { PageContent } from '../schemas'

const batchUpdatePageContent = batchUpdateEntity(PageContent)

export default batchUpdatePageContent
