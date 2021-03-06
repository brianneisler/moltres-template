import { StatusCode } from '../../../constants'
import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { expected } from '../../../utils/error'
import { all } from '../../../utils/lang'
import {
  batchCreatePhoneNumber,
  findPhoneNumberByPhoneNumber
} from '../../phone_number'
import { findPhoneNumberClaimByPhoneNumber } from '../../phone_number_claim'
import { batchCreateUser, updateUser } from '../../user'
import {
  batchCreateUserPhoneNumber,
  claimUserPhoneNumber,
  findExistingUserByPhoneNumber
} from '../../user_phone_number'
import { userRegisteredAction } from '../actions'

import queueUserRegisteredAction from './queueUserRegisteredAction'

const createValidUser = async (context, { phoneNumber }) => {
  let phoneNumberRef
  let userRef
  await commitBatch(
    buildBatch(context, (batch) => {
      phoneNumberRef = batchCreatePhoneNumber(context, batch, {
        phoneNumber,
        type: 'user'
      })
      userRef = batchCreateUser(context, batch, {
        state: 'valid'
      })

      batchCreateUserPhoneNumber(context, batch, {
        phoneNumberId: phoneNumberRef.id,
        userId: userRef.id
      })
    })
  )
  return all({
    phoneNumber: getFromRef(context, phoneNumberRef),
    user: getFromRef(context, userRef)
  })
}

const registerValidUser = async (context, { phoneNumber }) => {
  const existingPhoneNumber = await findPhoneNumberByPhoneNumber(
    context,
    phoneNumber,
    {
      includeRemoved: true
    }
  )

  let dbPhoneNumber
  let user

  if (existingPhoneNumber) {
    if (existingPhoneNumber.removedAt) {
      // TODO BRN: Figure out how to allow users with removed PhoneNumbers to
      // recover here
      throw expected({
        code: 'PHONE_NUMBER_REMOVED',
        message: 'This phone number has been removed',
        statusCode: StatusCode.ACCESS_DENIED
      })
    }
    if (existingPhoneNumber.type === 'internal') {
      throw expected({
        message: 'Cannot register user with an internal phone number'
      })
    }
    if (existingPhoneNumber.type === 'user') {
      const existingUser = await findExistingUserByPhoneNumber(
        context,
        phoneNumber
      )

      if (!existingUser) {
        throw new Error('Could not find existing user that owns PhoneNumber')
      }
      // Idempotency
      return {
        phoneNumber: existingPhoneNumber,
        user: existingUser
      }
    }

    const phoneNumberClaim = await findPhoneNumberClaimByPhoneNumber(
      context,
      phoneNumber
    )
    // TODO BRN: Handle the case where a phoneNumberClaim has been removed
    // This requires handling this at the rules level to allow for claims to be removed

    dbPhoneNumber = await claimUserPhoneNumber(context, phoneNumberClaim)
    user = await updateUser(context, phoneNumberClaim.userId, {
      state: 'valid'
    })
  } else {
    const result = await createValidUser(context, { phoneNumber })
    ;({ user } = result)
    dbPhoneNumber = result.phoneNumber
  }

  const action = await queueUserRegisteredAction(
    context,
    userRegisteredAction(context, {
      data: {
        phoneNumberId: dbPhoneNumber.id
      },
      method: 'sms',
      userId: user.id
    })
  )

  return {
    action,
    phoneNumber: dbPhoneNumber,
    user
  }
}

export default registerValidUser
