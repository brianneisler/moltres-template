import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const SMSMessage = {
  collectionName: 'SMSMessages',
  idField: 'messageSid',
  name: 'SMSMessage',
  schema: Entity.keys({
    accountSid: Joi.string().allow(''),
    apiVersion: Joi.string().allow(''),
    body: Joi.string().allow(''),
    channelContextId: id(),
    from: Joi.string().allow(''),
    fromCity: Joi.string().allow(''),
    fromCountry: Joi.string().allow(''),
    fromState: Joi.string().allow(''),
    fromZip: Joi.string().allow(''),
    media: Joi.array().items(
      Joi.object().keys({ contentType: Joi.string().allow(''), url: Joi.string().allow('') })
    ),
    messageSid: Joi.string(),
    numSegments: Joi.number().integer(),
    smsChannelId: id().required(),
    smsMessageSid: Joi.string().allow(''),
    smsSid: Joi.string().allow(''),
    smsStatus: Joi.string().allow(''),
    to: Joi.string().allow(''),
    toCity: Joi.string().allow(''),
    toCountry: Joi.string().allow(''),
    toState: Joi.string().allow(''),
    toZip: Joi.string().allow('')
  })
}

export default SMSMessage
