import { deleteEntity } from '../Entity'

import { ServiceAccount } from './schemas'

const deleteServiceAccount = deleteEntity(ServiceAccount)

export default deleteServiceAccount
