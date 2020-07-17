import { App } from './schemas'
import { getDocumentById } from '../../utils/db'

const getAppById = getDocumentById(App)

export default getAppById
