import { all } from '../../utils/data'
import { buildBatch, commitBatch } from '../../utils/db'
import batchDeleteInternalPhoneNumber from './batchDeleteInternalPhoneNumber'
import batchDeletePhoneNumber from '../PhoneNumber/batchDeletePhoneNumber'

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
