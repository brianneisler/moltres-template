import { findDocumentById } from 'moltres/db'

import { PageContent } from '../schemas'

const findPageContentById = findDocumentById(PageContent)

export default findPageContentById
