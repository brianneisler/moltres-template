import createSMSChannel from './createSMSChannel'
import findSMSChannelByUserAndInternalPhoneNumberIds from './findSMSChannelByUserAndInternalPhoneNumberIds'

const findOrCreateSMSChannel = async (context, { internalPhoneNumberId, userPhoneNumberId }) => {
  const smsChannel = await findSMSChannelByUserAndInternalPhoneNumberIds(
    context,
    userPhoneNumberId,
    internalPhoneNumberId,
    { includeRemoved: true }
  )
  if (smsChannel) {
    return smsChannel
  }
  return createSMSChannel(context, { internalPhoneNumberId, userPhoneNumberId })
}

export default findOrCreateSMSChannel
