import { getDocumentById } from '../../../utils/db'
import { App } from '../schemas'

const getAppById = getDocumentById(App)

export default getAppById
