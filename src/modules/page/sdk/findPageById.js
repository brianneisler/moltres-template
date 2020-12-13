import { findDocumentById } from 'moltres/db'

import { Page } from '../schemas'

const findPageById = findDocumentById(Page)

export default findPageById
