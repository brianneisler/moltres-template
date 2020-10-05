import { Boolean, Entity, Id, Object, String } from '../../../core/schemas'

const SMSChallenge = {
  collectionName: 'SMSChallenges',
  name: 'SMSChallenge',
  schema: Entity.schema.keys({
    code: String.schema.regex(/^[0-9]{6}$/).required(),
    expiresIn: String.schema.required(),
    phoneNumberId: Id.schema.required(),
    smsChannelId: Id.schema.required(),
    usedAt: Object.schema, // TODO BRN: Replace with joi check for firebase Timestamp
    valid: Boolean.schema.required()
  })
}

export default SMSChallenge
