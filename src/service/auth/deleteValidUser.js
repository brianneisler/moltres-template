import { deleteUser } from '../../db/User'
import {
  deleteUserPhoneNumber,
  findPhoneNumbersByUserId
} from '../../db/UserPhoneNumber'
import { map, values } from '../../utils/lang'

const deleteValidUser = async (context, userId) => {
  const phoneNumbers = await findPhoneNumbersByUserId(context, userId)
  await map(
    async (phoneNumber) => deleteUserPhoneNumber(context, phoneNumber.id),
    values(phoneNumbers)
  )
  return deleteUser(context, userId)
}

export default deleteValidUser
