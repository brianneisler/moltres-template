import { Array, Object, String } from '../../../../core/schemas'

const TwilioConfig = {
  name: 'twilio.TwilioConfig',
  schema: Object.schema.keys({
    accountSid: String.schema.required(),
    authToken: String.schema.required(),
    phoneNumbers: Array.schema.items(String.schema).required()
  })
}

export default TwilioConfig
