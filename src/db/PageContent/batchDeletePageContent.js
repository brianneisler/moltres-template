import { PageContent } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeletePageContent = batchDeleteEntity(PageContent)

export default batchDeletePageContent
