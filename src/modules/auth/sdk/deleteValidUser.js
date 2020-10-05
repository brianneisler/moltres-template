import { map, values } from '../../../utils/lang'
import { deleteUser } from '../../user'
import {
  deleteUserPhoneNumber,
  findPhoneNumbersByUserId
} from '../../user_phone_number'

const deleteValidUser = async (context, userId) => {
  const phoneNumbers = await findPhoneNumbersByUserId(context, userId)
  await map(
    async (phoneNumber) => deleteUserPhoneNumber(context, phoneNumber.id),
    values(phoneNumbers)
  )
  return deleteUser(context, userId)
}

export default deleteValidUser
