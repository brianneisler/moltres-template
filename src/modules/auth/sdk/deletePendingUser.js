import { map, values } from '../../../utils/lang'
import {
  deleteUnclaimedPhoneNumber,
  findPhoneNumberClaimsByUserId
} from '../../phone_number_claim'
import { deleteUser } from '../../user'

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
