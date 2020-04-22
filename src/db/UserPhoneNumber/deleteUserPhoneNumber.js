import { commitBatch } from '../../utils/db'
import batchDeletePhoneNumber from '../PhoneNumber/batchDeletePhoneNumber'
import batchDeleteUserPhoneNumber from './batchDeleteUserPhoneNumber'

const deleteUserPhoneNumber = async (context, id) => {
  const { database } = context
  const batch = database.batch()

  await Promise.all([
    batchDeletePhoneNumber(context, batch, id),
    batchDeleteUserPhoneNumber(context, batch, id)
  ])

  return commitBatch(batch)
}

export default deleteUserPhoneNumber
