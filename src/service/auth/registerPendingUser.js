import { StatusCode } from '../../constants'
import { commitBatch, formatDocument } from '../../utils/db'
import { expected } from '../../utils/error'
import batchCreatePhoneNumber from '../../db/PhoneNumber/batchCreatePhoneNumber'
import batchCreatePhoneNumberClaim from '../../db/PhoneNumberClaim/batchCreatePhoneNumberClaim'
import batchCreateUser from '../../db/User/batchCreateUser'
import findPhoneNumberByPhoneNumber from '../../db/PhoneNumber/findPhoneNumberByPhoneNumber'
import getPendingUserByPhoneNumberClaim from '../../db/PhoneNumberClaim/getPendingUserByPhoneNumberClaim'

const createPendingUser = async (context, { phoneNumber }) => {
  const { database } = context
  const batch = database.batch()

  const phoneNumberRef = batchCreatePhoneNumber(context, batch, {
    phoneNumber,
    type: 'unclaimed'
  })
  const userRef = batchCreateUser(context, batch, {
    state: 'pending'
  })

  batchCreatePhoneNumberClaim(context, batch, {
    phoneNumberId: phoneNumberRef.id,
    userId: userRef.id
  })

  await commitBatch(batch)

  const [phoneNumberDoc, userDoc] = await Promise.all([phoneNumberRef.get(), userRef.get()])
  return {
    phoneNumber: formatDocument(phoneNumberDoc),
    user: formatDocument(userDoc)
  }
}

const registerPendingUser = async (context, { phoneNumber }) => {
  const existingPhoneNumber = await findPhoneNumberByPhoneNumber(context, phoneNumber, {
    includeRemoved: true
  })

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
