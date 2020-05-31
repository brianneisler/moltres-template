import { Error } from './schemas'
import { getDocumentById } from '../../utils/db'

const getErrorById = getDocumentById(Error)

export default getErrorById
