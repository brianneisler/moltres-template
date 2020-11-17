import { buildBatch, commitBatch } from 'moltres/db'
import { all } from 'moltres/lang'
import { batchDeletePhoneNumber } from '../../phone_number/sdk'

import batchDeletePhoneNumberClaim from './batchDeletePhoneNumberClaim'
import findPhoneNumberClaimByPhoneNumberId from './findPhoneNumberClaimByPhoneNumberId'

const deleteUnclaimedPhoneNumber = async (context, phoneNumberId) =>
  commitBatch(
    buildBatch(context, async (batch) => {
      const phoneNumberClaim = await findPhoneNumberClaimByPhoneNumberId(
        context,
        phoneNumberId,
        {
          includeRemoved: true
        }
      )
      await all([
        batchDeletePhoneNumber(context, batch, phoneNumberId),
        batchDeletePhoneNumberClaim(context, batch, phoneNumberClaim.id)
      ])
    })
  )

export default deleteUnclaimedPhoneNumber
