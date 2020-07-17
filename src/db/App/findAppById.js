import { App } from './schemas'
import { findDocumentById } from '../../utils/db'

const findAppById = findDocumentById(App)

export default findAppById
