import { buildBatch, commitBatch, getFromRef } from 'moltres/db'
import { batchCreatePhoneNumber } from '../../phone_number/sdk'

import batchCreateInternalPhoneNumber from './batchCreateInternalPhoneNumber'

const createInternalPhoneNumber = async (context, data) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreatePhoneNumber(context, batch, {
        ...data,
        type: 'internal'
      })
      batchCreateInternalPhoneNumber(context, batch, {
        phoneNumberId: ref.id
      })
    })
  )
  return getFromRef(context, ref)
}

export default createInternalPhoneNumber
