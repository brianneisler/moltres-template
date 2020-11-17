import { getDocumentById } from 'moltres/db'

import { Error } from '../schemas'

const getErrorById = getDocumentById(Error)

export default getErrorById
