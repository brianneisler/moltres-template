import { isNil, isString } from '../../utils/data'
import findPhoneNumberIdByIndexPhoneNumberHash from '../PhoneNumber/findPhoneNumberIdByIndexPhoneNumberHash'
import findUserPhoneNumberByPhoneNumberId from './findUserPhoneNumberByPhoneNumberId'
import formatPhoneNumber from '../PhoneNumber/formatPhoneNumber'
import getUserById from '../User/getUserById'
import hashPhoneNumber from '../PhoneNumber/hashPhoneNumber'

const findExistingUserByPhoneNumber = async (context, phoneNumber, options = {}) => {
  if (isNil(phoneNumber)) {
    throw new Error('phoneNumber must be defined')
  }
  try {
    let phoneNumberId
    if (isString(phoneNumber)) {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber)
      const phoneNumberHash = hashPhoneNumber(formattedPhoneNumber)
      // NOTE: This is a lookup against the index table so
      // that client side systems can perform this lookup. This is a secure way of
      // performing this lookup without having to expose the phone numbers table
      phoneNumberId = await findPhoneNumberIdByIndexPhoneNumberHash(context, phoneNumberHash)
    } else {
      phoneNumberId = phoneNumber.id
    }

    if (phoneNumberId) {
      const userPhoneNumber = await findUserPhoneNumberByPhoneNumberId(
        context,
        phoneNumberId,
        options
      )
      if (!userPhoneNumber) {
        return null
      }
      return getUserById(context, userPhoneNumber.userId, options)
    }
  } catch (error) {
    if (error.code !== 'INVALID_PHONE_NUMBER') {
      throw error
    }
  }
  return null
}

export default findExistingUserByPhoneNumber