import { getDocumentById } from '../../../utils/db'
import { AccessToken } from '../schemas'

const getAccessTokenById = getDocumentById(AccessToken)

export default getAccessTokenById
