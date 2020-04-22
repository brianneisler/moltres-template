import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'

const InternalPhoneNumber = {
  collectionName: 'InternalPhoneNumbers',
  idField: 'phoneNumberId',
  name: 'InternalPhoneNumber',
  schema: Entity.keys({
    phoneNumberId: id().required()
  })
}

export default InternalPhoneNumber
