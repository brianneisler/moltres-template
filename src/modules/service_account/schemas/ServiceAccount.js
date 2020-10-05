import { Entity, String } from '../../../core/schemas'

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
