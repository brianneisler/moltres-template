import { getDocumentById } from 'moltres/db'

import { AccessToken } from '../schemas'

const getAccessTokenById = getDocumentById(AccessToken)

export default getAccessTokenById
