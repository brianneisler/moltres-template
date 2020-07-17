import { PageContent } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdatePageContent = batchUpdateEntity(PageContent)

export default batchUpdatePageContent
