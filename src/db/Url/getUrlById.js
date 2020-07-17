import { getDocumentById } from '../../utils/db'

import { Url } from './schemas'

const getUrlById = getDocumentById(Url)

export default getUrlById
