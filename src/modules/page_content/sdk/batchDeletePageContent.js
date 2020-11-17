import { batchDeleteEntity } from 'moltres/core'
import { PageContent } from '../schemas'

const batchDeletePageContent = batchDeleteEntity(PageContent)

export default batchDeletePageContent
