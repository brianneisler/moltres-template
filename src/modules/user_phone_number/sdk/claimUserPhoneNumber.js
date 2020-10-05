import { buildBatch, commitBatch, getFromRef } from '../../../utils/db'
import { batchUpdatePhoneNumber } from '../../phone_number'

import batchCreateUserPhoneNumber from './batchCreateUserPhoneNumber'

const claimUserPhoneNumber = async (context, { phoneNumberId, userId }) => {
  let ref
  await commitBatch(
    buildBatch(context, async (batch) => {
      batchCreateUserPhoneNumber(context, batch, {
        phoneNumberId,
        userId
      })

      ref = await batchUpdatePhoneNumber(context, batch, phoneNumberId, {
        type: 'user'
      })
    })
  )
  return getFromRef(context, ref)
}

export default claimUserPhoneNumber
