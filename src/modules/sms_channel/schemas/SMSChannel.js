import { Entity, Id } from '../../../core/schemas'

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
