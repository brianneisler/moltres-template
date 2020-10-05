import {
  Array,
  Entity,
  Id,
  Integer,
  Object,
  String
} from '../../../core/schemas'

const SMSMessage = {
  collectionName: 'SMSMessages',
  idField: 'messageSid',
  name: 'SMSMessage',
  schema: Entity.schema.keys({
    accountSid: String.schema.allow(''),
    apiVersion: String.schema.allow(''),
    body: String.schema.allow(''),
    channelContextId: Id.schema,
    from: String.schema.allow(''),
    fromCity: String.schema.allow(''),
    fromCountry: String.schema.allow(''),
    fromState: String.schema.allow(''),
    fromZip: String.schema.allow(''),
    media: Array.schema.items(
      Object.schema.keys({
        contentType: String.schema.allow(''),
        url: String.schema.allow('')
      })
    ),
    messageSid: String.schema,
    numSegments: Integer.schema,
    smsChannelId: Id.schema.required(),
    smsMessageSid: String.schema.allow(''),
    smsSid: String.schema.allow(''),
    smsStatus: String.schema.allow(''),
    to: String.schema.allow(''),
    toCity: String.schema.allow(''),
    toCountry: String.schema.allow(''),
    toState: String.schema.allow(''),
    toZip: String.schema.allow('')
  })
}

export default SMSMessage
