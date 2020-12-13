import { getDocumentById } from 'moltres/db'
import { Url } from '../schemas'

const getUrlById = getDocumentById(Url)

export default getUrlById
