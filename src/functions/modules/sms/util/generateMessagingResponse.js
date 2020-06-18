import { forEach } from '../../../../utils/lang'
import twilio from 'twilio'

const { twiml } = twilio

const generateMessagingResponse = (responses) => {
  const messagingResponse = new twiml.MessagingResponse()
  forEach((response) => {
    if (!response) {
      return
    }
    if (response.media) {
      // Docs on how to do this. F'n hard to find!
      // https://www.twilio.com/docs/sms/twiml/message?code-sample=code-sending-of-an-message-with-media-mms-3&code-language=Node.js&code-sdk-version=3.x#linkcode
      const message = messagingResponse.message()
      message.media(response.media)
      if (response.message) {
        message.body(response.message)
      }
    } else {
      messagingResponse.message(response.message)
    }
  }, responses)
  return messagingResponse
}

export default generateMessagingResponse
