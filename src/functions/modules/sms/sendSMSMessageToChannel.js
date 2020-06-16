import { all, isString } from '../../../utils/data'
import { expected } from '../../../utils/error'
import { getPhoneNumberById } from '../../../db/PhoneNumber'
import { getSMSChannelById } from '../../../db/SMSChannel'
import { sendSMSMessage } from './util'

const sendSMSMessageToChannel = async (
  context,
  { body, media, smsChannel }
) => {
  if (isString(smsChannel)) {
    smsChannel = await getSMSChannelById(context, smsChannel)
  }
  if (!smsChannel) {
    throw new Error('SMSChannel is required')
  }

  const [userPhoneNumber, internalPhoneNumber] = await all([
    getPhoneNumberById(context, smsChannel.userPhoneNumberId, {
      includeRemoved: true
    }),
    getPhoneNumberById(context, smsChannel.internalPhoneNumberId, {
      includeRemoved: true
    })
  ])

  if (!userPhoneNumber) {
    throw new Error(
      `Could not find UserPhoneNumber with id ${smsChannel.userPhoneNumberId}`
    )
  }
  if (userPhoneNumber.removedAt) {
    throw expected({
      code: 'PHONE_NUMBER_REMOVED',
      message: `User phone number with the id ${smsChannel.userPhoneNumberId} has been removed`
    })
  }

  if (!internalPhoneNumber) {
    throw new Error(
      `Could not find InternalPhoneNumber with id ${smsChannel.internalPhoneNumberId}`
    )
  }
  if (internalPhoneNumber.removedAt) {
    throw expected({
      code: 'PHONE_NUMBER_REMOVED',
      message: `Internal phone number with the id ${smsChannel.internalPhoneNumberId} has been removed`
    })
  }

  return sendSMSMessage(context, {
    body,
    from: internalPhoneNumber.phoneNumber,
    media,
    to: userPhoneNumber.phoneNumber
  })
}

export default sendSMSMessageToChannel
