import { getDocumentById } from 'moltres/db'

import { Page } from '../schemas'

const getPageById = getDocumentById(Page)

export default getPageById
