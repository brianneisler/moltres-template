import { App } from './schemas'
import { refDocumentById } from '../../utils/db'

const refAppById = refDocumentById(App)

export default refAppById
