import { all } from 'moltres/lang'

import { buildBatch, commitBatch } from 'moltres/db'
import { batchDeletePhoneNumber } from '../../phone_number'

import batchDeleteUserPhoneNumber from './batchDeleteUserPhoneNumber'

const deleteUserPhoneNumber = async (context, id) =>
  commitBatch(
    buildBatch(
      context,
      async (batch) =>
        await all([
          batchDeletePhoneNumber(context, batch, id),
          batchDeleteUserPhoneNumber(context, batch, id)
        ])
    )
  )

export default deleteUserPhoneNumber
