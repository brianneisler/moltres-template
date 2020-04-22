import { commitBatch } from '../../utils/db'
import batchDeletePhoneNumber from '../PhoneNumber/batchDeletePhoneNumber'
import batchDeletePhoneNumberClaim from './batchDeletePhoneNumberClaim'
import findPhoneNumberClaimByPhoneNumberId from './findPhoneNumberClaimByPhoneNumberId'

const deleteUnclaimedPhoneNumber = async (context, phoneNumberId) => {
  const { database } = context
  const batch = database.batch()

  const phoneNumberClaim = await findPhoneNumberClaimByPhoneNumberId(context, phoneNumberId, {
    includeRemoved: true
  })
  await Promise.all([
    batchDeletePhoneNumber(context, batch, phoneNumberId),
    batchDeletePhoneNumberClaim(context, batch, phoneNumberClaim.id)
  ])

  return commitBatch(batch)
}

export default deleteUnclaimedPhoneNumber
