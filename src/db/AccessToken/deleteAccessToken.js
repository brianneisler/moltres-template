import { deleteEntity } from '../Entity'

import { AccessToken } from './schemas'

const deleteAccessToken = deleteEntity(AccessToken)

export default deleteAccessToken
