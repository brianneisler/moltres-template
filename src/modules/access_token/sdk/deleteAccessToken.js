import { deleteEntity } from '../../../core/sdk'
import { AccessToken } from '../schemas'

const deleteAccessToken = deleteEntity(AccessToken)

export default deleteAccessToken
