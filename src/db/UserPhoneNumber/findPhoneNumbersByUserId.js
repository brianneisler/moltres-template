import { map } from '../../utils/data'
import { props } from 'bluebird'
import findUserPhoneNumbersByUserId from './findUserPhoneNumbersByUserId'
import getPhoneNumberById from '../PhoneNumber/getPhoneNumberById'

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
