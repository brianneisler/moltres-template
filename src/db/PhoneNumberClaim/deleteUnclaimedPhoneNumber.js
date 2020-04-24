import { all } from '../../utils/data'
import { buildBatch, commitBatch } from '../../utils/db'
import batchDeletePhoneNumber from '../PhoneNumber/batchDeletePhoneNumber'
import batchDeletePhoneNumberClaim from './batchDeletePhoneNumberClaim'
import findPhoneNumberClaimByPhoneNumberId from './findPhoneNumberClaimByPhoneNumberId'

const deleteUnclaimedPhoneNumber = async (context, phoneNumberId) =>
  commitBatch(
    buildBatch(context, async (batch) => {
      const phoneNumberClaim = await findPhoneNumberClaimByPhoneNumberId(context, phoneNumberId, {
        includeRemoved: true
      })
      await all([
        batchDeletePhoneNumber(context, batch, phoneNumberId),
        batchDeletePhoneNumberClaim(context, batch, phoneNumberClaim.id)
      ])
    })
  )

export default deleteUnclaimedPhoneNumber
