import { AccessToken } from './schemas'
import { getDocumentById } from '../../utils/db'

const getAccessTokenById = getDocumentById(AccessToken)

export default getAccessTokenById
