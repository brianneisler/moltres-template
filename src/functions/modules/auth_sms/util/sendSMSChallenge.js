import { sendSMSMessageToChannel } from '../../../../sdk/sms'

const sendSMSChallenge = async (context, { smsChallenge, smsChannel }) =>
  sendSMSMessageToChannel(context, {
    body: `${smsChallenge.code} is your access code. Don't reply to me with your code.`,
    smsChannel
  })

export default sendSMSChallenge
