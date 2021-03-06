import { StatusCode } from '../../../constants'
import { isString } from '../../../utils/lang'
import { registerPendingUser } from '../../auth'
import {
  findPhoneNumberByPhoneNumber,
  verifyPhoneNumber
} from '../../phone_number'
import { getPendingUserByPhoneNumberClaim } from '../../phone_number_claim'
import { findExistingUserByPhoneNumber } from '../../user_phone_number'

import generateSMSChannel from './generateSMSChannel'

const generateUserAndSMSChannel = async (
  context,
  { internalPhoneNumber, unformattedPhoneNumber }
) => {
  let user
  let isNewUser = false

  let phoneNumber = await findPhoneNumberByPhoneNumber(
    context,
    unformattedPhoneNumber,
    {
      includeRemoved: true
    }
  )

  if (!phoneNumber) {
    isNewUser = true
    ;({ phoneNumber, user } = await registerPendingUser(context, {
      phoneNumber: unformattedPhoneNumber
    }))
  } else {
    verifyPhoneNumber(phoneNumber, { statusCode: StatusCode.ACCESS_DENIED })
    if (phoneNumber.type === 'internal') {
      throw new Error('Cannot use internal phone numbers for users')
    }
    user = await findExistingUserByPhoneNumber(context, phoneNumber)
    if (!user) {
      user = await getPendingUserByPhoneNumberClaim(context, phoneNumber)
    }
  }

  if (isString(internalPhoneNumber)) {
    const foundInternalPhoneNumber = await findPhoneNumberByPhoneNumber(
      context,
      internalPhoneNumber,
      { includeRemoved: true }
    )
    internalPhoneNumber = foundInternalPhoneNumber
  }

  const smsChannel = await generateSMSChannel(context, {
    internalPhoneNumber,
    phoneNumber
  })

  return {
    isNewUser,
    phoneNumber,
    smsChannel,
    user
  }
}

export default generateUserAndSMSChannel
