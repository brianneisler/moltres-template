import { Id } from '../../../core/schemas'
import { Entity } from '../../Entity'

const SMSChannel = {
  collectionName: 'SMSChannels',
  indexes: [['userPhoneNumberId', 'internalPhoneNumberId']],
  name: 'SMSChannel',
  schema: Entity.schema.keys({
    internalPhoneNumberId: Id.schema.required(),
    userPhoneNumberId: Id.schema.required()
  })
}

export default SMSChannel
