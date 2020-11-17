import { findDocumentById } from 'moltres/db'
import { App } from '../schemas'

const findAppById = findDocumentById(App)

export default findAppById
