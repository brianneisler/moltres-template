import { deleteEntity } from '../../../core/sdk'
import { ServiceAccount } from '../schemas'

const deleteServiceAccount = deleteEntity(ServiceAccount)

export default deleteServiceAccount
