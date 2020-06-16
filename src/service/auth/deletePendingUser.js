import {
  deleteUnclaimedPhoneNumber,
  findPhoneNumberClaimsByUserId
} from '../../db/PhoneNumberClaim'
import { deleteUser } from '../../db/User'
import { map, values } from '../../utils/data'

const deletePendingUser = async (context, userId) => {
  const phoneNumberClaims = await findPhoneNumberClaimsByUserId(context, userId)
  await map(
    async (phoneNumberClaim) =>
      deleteUnclaimedPhoneNumber(context, phoneNumberClaim.phoneNumberId),
    values(phoneNumberClaims)
  )
  return deleteUser(context, userId)
}

export default deletePendingUser
