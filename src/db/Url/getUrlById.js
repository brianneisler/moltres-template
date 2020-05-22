import { Url } from './schemas'
import { getDocumentById } from '../../utils/db'

const getUrlById = getDocumentById(Url)

export default getUrlById
