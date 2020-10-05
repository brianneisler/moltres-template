import { findDocumentById } from '../../../utils/db'
import { PageContent } from '../schemas'

const findPageContentById = findDocumentById(PageContent)

export default findPageContentById
