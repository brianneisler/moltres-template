import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { batchCreatePhoneNumber } from '../../phone_number/sdk'

import batchCreatePhoneNumberClaim from './batchCreatePhoneNumberClaim'

const createUnclaimedPhoneNumber = async (context, data) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreatePhoneNumber(context, batch, {
        phoneNumber: data.phoneNumber,
        type: 'unclaimed'
      })
      batchCreatePhoneNumberClaim(context, batch, {
        phoneNumberId: ref.id,
        userId: data.userId
      })
    })
  )

  return getFromRef(context, ref)
}

export default createUnclaimedPhoneNumber
