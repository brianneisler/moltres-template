import { findPhoneNumberIdByPhoneNumber } from '../../phone_number/sdk'

import findPhoneNumberClaimByPhoneNumberId from './findPhoneNumberClaimByPhoneNumberId'

const findPhoneNumberClaimByPhoneNumber = async (
  context,
  phoneNumber,
  options = {}
) => {
  const phoneNumberId = await findPhoneNumberIdByPhoneNumber(
    context,
    phoneNumber
  )
  return findPhoneNumberClaimByPhoneNumberId(context, phoneNumberId, options)
}

export default findPhoneNumberClaimByPhoneNumber
