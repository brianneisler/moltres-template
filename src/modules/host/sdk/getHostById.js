import { getDocumentById } from 'moltres/db'
import { Host } from '../schemas'

const getHostById = getDocumentById(Host)

export default getHostById
