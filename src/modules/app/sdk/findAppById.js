import { findDocumentById } from '../../../utils/db'
import { App } from '../schemas'

const findAppById = findDocumentById(App)

export default findAppById
