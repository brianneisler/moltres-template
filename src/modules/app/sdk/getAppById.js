import { getDocumentById } from 'moltres/db'
import { App } from '../schemas'

const getAppById = getDocumentById(App)

export default getAppById
