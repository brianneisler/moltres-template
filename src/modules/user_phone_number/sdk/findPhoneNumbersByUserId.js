import { props } from 'bluebird'
import { map } from 'moltres/lang'

import { getPhoneNumberById } from '../../phone_number'

import findUserPhoneNumbersByUserId from './findUserPhoneNumbersByUserId'

const findPhoneNumbersByUserId = async (context, userId, options = {}) => {
  const userPhoneNumbers = await findUserPhoneNumbersByUserId(
    context,
    userId,
    options
  )
  return props(
    map(
      (userPhoneNumber) =>
        getPhoneNumberById(context, userPhoneNumber.phoneNumberId, options),
      userPhoneNumbers
    )
  )
}

export default findPhoneNumbersByUserId
