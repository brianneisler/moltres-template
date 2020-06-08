import { PageContent } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreatePageContent = batchCreateEntity(PageContent)

export default batchCreatePageContent
