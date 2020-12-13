import { expected } from 'moltres/error'

const verifySMSChannel = (smsChannel, { id, statusCode } = {}) => {
  if (!smsChannel) {
    throw new Error(`Could not find SMSChannel${id ? ':' + id : ''}`)
  }
  if (smsChannel.removedAt) {
    throw expected({
      code: 'SMS_CHANNEL_REMOVED',
      message: `SMSChannel '${smsChannel.id}' has been removed`,
      statusCode
    })
  }
  return smsChannel
}

export default verifySMSChannel
