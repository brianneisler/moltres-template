import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'

const UserPhoneNumber = {
  collectionName: 'UserPhoneNumbers',
  idField: 'phoneNumberId',
  name: 'UserPhoneNumber',
  schema: Entity.keys({
    phoneNumberId: id().required(),
    userId: id().required()
  })
}

export default UserPhoneNumber
