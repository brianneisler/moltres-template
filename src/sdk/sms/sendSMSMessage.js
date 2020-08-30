import twilio from 'twilio'

/**
 * @param {{ sms: { accountSid: String, authToken: String }}} context
 * @param {{ from: String, to: String, body: String, mediaUrl: String }} data
 */
const sendSMSMessage = async ({ config }, { body, from, media, to }) => {
  const { accountSid, authToken } = config.sms
  const client = twilio(accountSid, authToken)
  return client.messages.create({
    body,
    from,
    mediaUrl: media,
    to
  })
}

export default sendSMSMessage
