import { batchCreateEntity } from 'moltres/core'
import { PageContent } from '../schemas'

const batchCreatePageContent = batchCreateEntity(PageContent)

export default batchCreatePageContent
