import findPhoneNumberIdByPhoneNumber from '../PhoneNumber/findPhoneNumberIdByPhoneNumber'

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
