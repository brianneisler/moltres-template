import { props } from 'bluebird'

import { map } from '../../utils/lang'
import getPhoneNumberById from '../PhoneNumber/getPhoneNumberById'

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
