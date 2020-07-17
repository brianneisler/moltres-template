import { map, range } from '../../../../utils/lang'

const parseSMSMessage = (requestBody) => {
  // Body: message
  // From: phone number the message was from
  const numMedia = parseInt(requestBody.NumMedia)
  const media = map(
    (index) => ({
      contentType: requestBody[`MediaContentType${index}`],
      url: requestBody[`MediaUrl${index}`]
    }),
    range(0, numMedia)
  )
  return {
    accountSid: requestBody.AccountSid,
    apiVersion: requestBody.ApiVersion,
    body: requestBody.Body,
    from: requestBody.From,
    fromCity: requestBody.FromCity,
    fromCountry: requestBody.FromCountry,
    fromState: requestBody.FromState,
    fromZip: requestBody.FromZip,
    media,
    messageSid: requestBody.MessageSid,
    numSegments: parseInt(requestBody.NumSegments),
    smsMessageSid: requestBody.SmsMessageSid,
    smsSid: requestBody.SmsSid,
    smsStatus: requestBody.SmsStatus,
    to: requestBody.To,
    toCity: requestBody.ToCity,
    toCountry: requestBody.ToCountry,
    toState: requestBody.ToState,
    toZip: requestBody.ToZip
  }
}

export default parseSMSMessage
