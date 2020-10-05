import { findDocumentById } from '../../../utils/db'
import { Page } from '../schemas'

const findPageById = findDocumentById(Page)

export default findPageById
