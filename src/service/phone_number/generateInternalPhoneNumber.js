import { createInternalPhoneNumber } from '../../db/InternalPhoneNumber'
import { findPhoneNumberByPhoneNumber } from '../../db/PhoneNumber'
import expected from '../../utils/error/expected'

const generateInternalPhoneNumber = async (context, data) => {
  const phoneNumber = await findPhoneNumberByPhoneNumber(context, data.phoneNumber, {
    includeRemoved: true
  })
  if (phoneNumber) {
    // TODO BRN: Allow for removed phone numbers to be converted
    if (phoneNumber.removedAt) {
      throw expected({
        code: 'PHONE_NUMBER_REMOVED',
        message: `Phone number '${data.phoneNumber}' has been removed`
      })
    }
    if (phoneNumber.type !== 'internal') {
      throw new Error(
        `Expected phone number to be of type "internal" instead found "${phoneNumber.type}"`
      )
    }
    return phoneNumber
  }
  return createInternalPhoneNumber(context, data)
}

export default generateInternalPhoneNumber
