import { buildBatch, commitBatch, getFromRef } from '../../utils/db'
import batchCreatePhoneNumber from '../PhoneNumber/batchCreatePhoneNumber'

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
