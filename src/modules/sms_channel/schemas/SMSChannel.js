import { Entity, Id } from 'moltres/core'

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
