import { ServiceAccount } from './schemas'
import { deleteEntity } from '../Entity'

const deleteServiceAccount = deleteEntity(ServiceAccount)

export default deleteServiceAccount
