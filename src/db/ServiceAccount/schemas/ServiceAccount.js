import { String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const ServiceAccount = {
  collectionName: 'ServiceAccounts',
  idField: 'uid',
  name: 'ServiceAccount',
  schema: Entity.schema.keys({
    name: String.schema.required(),
    uid: String.schema.required()
  })
}

export default ServiceAccount
