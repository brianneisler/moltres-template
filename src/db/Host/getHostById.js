import { Host } from './schemas'
import { getDocumentById } from '../../utils/db'

const getHostById = getDocumentById(Host)

export default getHostById
