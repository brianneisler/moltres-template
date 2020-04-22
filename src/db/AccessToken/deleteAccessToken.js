import { AccessToken } from './schemas'
import { deleteEntity } from '../Entity'

const deleteAccessToken = deleteEntity(AccessToken)

export default deleteAccessToken
