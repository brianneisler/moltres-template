import { getDocumentById } from '../../utils/db'

import { Host } from './schemas'

const getHostById = getDocumentById(Host)

export default getHostById
