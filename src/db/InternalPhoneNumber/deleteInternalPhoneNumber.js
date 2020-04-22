import { commitBatch } from '../../utils/db'
import batchDeleteInternalPhoneNumber from './batchDeleteInternalPhoneNumber'
import batchDeletePhoneNumber from '../PhoneNumber/batchDeletePhoneNumber'

const deleteInternalPhoneNumber = async (context, id) => {
  const { database } = context
  const batch = database.batch()

  await Promise.all([
    batchDeletePhoneNumber(context, batch, id),
    batchDeleteInternalPhoneNumber(context, batch, id)
  ])

  return commitBatch(batch)
}

export default deleteInternalPhoneNumber
