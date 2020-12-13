import { refDocumentById } from 'moltres/db'
import { App } from '../schemas'

const refAppById = refDocumentById(App)

export default refAppById
