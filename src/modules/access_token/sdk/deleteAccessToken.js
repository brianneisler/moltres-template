import { deleteEntity } from 'moltres/core'

import { AccessToken } from '../schemas'

const deleteAccessToken = deleteEntity(AccessToken)

export default deleteAccessToken
