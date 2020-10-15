import twilio from 'twilio'

const verifyTwilioRequest = (context, request) => {
  const { config } = context
  return twilio.validateExpressRequest(request, config.twilio.authToken, {
    url: `${config.api.url}/sms`
  })
}

export default verifyTwilioRequest
