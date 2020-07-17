import { PageContent } from './schemas'
import { findDocumentById } from '../../utils/db'

const findPageContentById = findDocumentById(PageContent)

export default findPageContentById
