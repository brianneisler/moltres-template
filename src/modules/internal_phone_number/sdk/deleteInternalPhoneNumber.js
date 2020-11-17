import { buildBatch, commitBatch } from 'moltres/db'
import { all } from 'moltres/lang'
import { batchDeletePhoneNumber } from '../../phone_number/sdk'

import batchDeleteInternalPhoneNumber from './batchDeleteInternalPhoneNumber'

const deleteInternalPhoneNumber = async (context, id) =>
  commitBatch(
    buildBatch(context, async (batch) => {
      await all([
        batchDeletePhoneNumber(context, batch, id),
        batchDeleteInternalPhoneNumber(context, batch, id)
      ])
    })
  )

export default deleteInternalPhoneNumber
