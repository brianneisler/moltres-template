import { PageContent } from './schemas'
import { getDocumentById } from '../../utils/db'

const getPageContentById = getDocumentById(PageContent)

export default getPageContentById
