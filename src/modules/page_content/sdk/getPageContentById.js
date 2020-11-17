import { getDocumentById } from 'moltres/db'
import { PageContent } from '../schemas'

const getPageContentById = getDocumentById(PageContent)

export default getPageContentById
