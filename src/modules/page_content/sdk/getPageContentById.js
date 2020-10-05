import { getDocumentById } from '../../../utils/db'
import { PageContent } from '../schemas'

const getPageContentById = getDocumentById(PageContent)

export default getPageContentById
