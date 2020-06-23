import { Entity } from '../../Entity'
import { Id } from '../../../core/schemas'

const InternalPhoneNumber = {
  collectionName: 'InternalPhoneNumbers',
  idField: 'phoneNumberId',
  name: 'InternalPhoneNumber',
  schema: Entity.schema.keys({
    phoneNumberId: Id.schema.required()
  })
}

export default InternalPhoneNumber
