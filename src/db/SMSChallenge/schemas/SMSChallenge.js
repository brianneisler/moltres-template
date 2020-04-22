import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const SMSChallenge = {
  collectionName: 'SMSChallenges',
  name: 'SMSChallenge',
  schema: Entity.keys({
    code: Joi.string()
      .regex(/^[0-9]{6}$/)
      .required(),
    expiresIn: Joi.string().required(),
    phoneNumberId: id().required(),
    smsChannelId: id().required(),
    usedAt: Joi.object(), // TODO BRN: Replace with joi check for firebase Timestamp
    valid: Joi.boolean().required()
  })
}

export default SMSChallenge
