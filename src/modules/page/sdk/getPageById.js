import { getDocumentById } from '../../../utils/db'
import { Page } from '../schemas'

const getPageById = getDocumentById(Page)

export default getPageById
