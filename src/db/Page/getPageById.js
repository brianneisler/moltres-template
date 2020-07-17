import { Page } from './schemas'
import { getDocumentById } from '../../utils/db'

const getPageById = getDocumentById(Page)

export default getPageById
