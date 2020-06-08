import { PageContent } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemovePageContent = batchRemoveEntity(PageContent)

export default batchRemovePageContent
