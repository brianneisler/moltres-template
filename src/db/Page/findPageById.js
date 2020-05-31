import { Page } from './schemas'
import { findDocumentById } from '../../utils/db'

const findPageById = findDocumentById(Page)

export default findPageById
