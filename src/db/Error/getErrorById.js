import { getDocumentById } from '../../utils/db'

import { Error } from './schemas'

const getErrorById = getDocumentById(Error)

export default getErrorById
