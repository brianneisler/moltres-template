import { Id } from '../../../core/schemas'
import { Entity } from '../../Entity'

const InternalPhoneNumber = {
  collectionName: 'InternalPhoneNumbers',
  idField: 'phoneNumberId',
  name: 'InternalPhoneNumber',
  schema: Entity.schema.keys({
    phoneNumberId: Id.schema.required()
  })
}

export default InternalPhoneNumber
