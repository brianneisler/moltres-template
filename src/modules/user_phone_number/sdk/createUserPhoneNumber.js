import { buildBatch, commitBatch, getFromRef } from 'moltres/db'
import { batchCreatePhoneNumber } from '../../phone_number'

import batchCreateUserPhoneNumber from './batchCreateUserPhoneNumber'

const createUserPhoneNumber = async (context, data) => {
  let ref
  await commitBatch(
    buildBatch(context, (batch) => {
      ref = batchCreatePhoneNumber(context, batch, {
        ...data,
        type: 'user'
      })
      batchCreateUserPhoneNumber(context, batch, {
        phoneNumberId: ref.id
      })
    })
  )
  return getFromRef(context, ref)
}

export default createUserPhoneNumber
