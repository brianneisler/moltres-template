import { StatusCode } from '../../constants'
import batchCreatePhoneNumber from '../../db/PhoneNumber/batchCreatePhoneNumber'
import findPhoneNumberByPhoneNumber from '../../db/PhoneNumber/findPhoneNumberByPhoneNumber'
import batchCreatePhoneNumberClaim from '../../db/PhoneNumberClaim/batchCreatePhoneNumberClaim'
import getPendingUserByPhoneNumberClaim from '../../db/PhoneNumberClaim/getPendingUserByPhoneNumberClaim'
import batchCreateUser from '../../db/User/batchCreateUser'
import { buildBatch, commitBatch, getFromRef } from '../../utils/db'
import { expected } from '../../utils/error'
import { all } from '../../utils/lang'

const createPendingUser = async (context, { phoneNumber }) => {
  let phoneNumberRef
  let userRef
  await commitBatch(
    buildBatch(context, (batch) => {
      phoneNumberRef = batchCreatePhoneNumber(context, batch, {
        phoneNumber,
        type: 'unclaimed'
      })
      userRef = batchCreateUser(context, batch, {
        state: 'pending'
      })

      batchCreatePhoneNumberClaim(context, batch, {
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

const registerPendingUser = async (context, { phoneNumber }) => {
  const existingPhoneNumber = await findPhoneNumberByPhoneNumber(
    context,
    phoneNumber,
    {
      includeRemoved: true
    }
  )

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
      throw expected({
        message: 'A user already exists with that phone number'
      })
    }

    const user = await getPendingUserByPhoneNumberClaim(context, phoneNumber, {
      includeRemoved: true
    })
    return {
      phoneNumber: existingPhoneNumber,
      user
    }
  }

  return createPendingUser(context, {
    phoneNumber
  })
}

export default registerPendingUser
