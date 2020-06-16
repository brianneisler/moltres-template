import { StatusCode } from '../../constants'
import {
  findOrCreateSMSChannel,
  findSMSChannelsByUserPhoneNumberId
} from '../../db/SMSChannel'
import { findPhoneNumberByPhoneNumber } from '../../db/PhoneNumber'
import { findPhoneNumberClaimsByUserId } from '../../db/PhoneNumberClaim'
import { findUserPhoneNumbersByUserId } from '../../db/UserPhoneNumber'
import { first, isEmpty, isNil, isString, values } from '../../utils/data'
import { getRandomInternalPhoneNumber } from '../../db/InternalPhoneNumber'
import { getUserById } from '../../db/User'
import { verifyPhoneNumber } from '../phone_number'
import { verifyUser } from '../user'
import verifySMSChannel from './verifySMSChannel'

const generateSMSChannel = async (
  context,
  { internalPhoneNumber, phoneNumber, userId, userPhoneNumberId }
) => {
  if (isString(phoneNumber)) {
    phoneNumber = await findPhoneNumberByPhoneNumber(context, phoneNumber)
  }
  if (phoneNumber) {
    verifyPhoneNumber(phoneNumber)
  }

  if (isNil(phoneNumber) && isNil(userPhoneNumberId)) {
    if (isNil(userId)) {
      throw new Error(
        'Either phoneNumber, userId or userPhoneNumberId must be defined'
      )
    }
    const user = await getUserById(context, userId, { includeRemoved: true })
    verifyUser(user, { id: userId })

    if (user.state === 'pending') {
      const phoneNumberClaims = await findPhoneNumberClaimsByUserId(
        context,
        userId
      )
      if (isEmpty(phoneNumberClaims)) {
        throw new Error(
          `Could not find any phone numbers for the pending user ${userId}`
        )
      }
      userPhoneNumberId = first(values(phoneNumberClaims)).id
    } else if (user.state === 'valid') {
      const userPhoneNumbers = await findUserPhoneNumbersByUserId(
        context,
        userId
      )
      if (isEmpty(userPhoneNumbers)) {
        throw new Error(
          `Could not find any phone numbers for the valid user ${userId}`
        )
      }
      userPhoneNumberId = first(values(userPhoneNumbers)).id
    }
  }
  if (phoneNumber) {
    userPhoneNumberId = phoneNumber.id
  }

  // If we don't have an internalPhoneNumber than look for an existing channel
  // that has already been created for the user. If one exists, return it,
  // otherwise find a random internal phone number and then generate a channel
  if (!internalPhoneNumber) {
    const smsChannels = values(
      await findSMSChannelsByUserPhoneNumberId(context, userPhoneNumberId)
    )
    if (smsChannels.length > 0) {
      return smsChannels[0]
    }
    internalPhoneNumber = await getRandomInternalPhoneNumber(context)
  }
  verifyPhoneNumber(internalPhoneNumber, {
    id: internalPhoneNumber.id,
    statusCode: StatusCode.ACCESS_DENIED
  })

  // If we have both an internal phone number and a user phone number.
  // Look for an existing channel that has that combination. If none exists,
  // create one.
  const smsChannel = await findOrCreateSMSChannel(context, {
    internalPhoneNumberId: internalPhoneNumber.id,
    userPhoneNumberId
  })
  return verifySMSChannel(smsChannel)
}

export default generateSMSChannel
