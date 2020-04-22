import { commitBatch } from '../../utils/db'
import batchCreateUserPhoneNumber from './batchCreateUserPhoneNumber'
import batchUpdatePhoneNumber from '../PhoneNumber/batchUpdatePhoneNumber'

const claimUserPhoneNumber = async (context, { phoneNumberId, userId }) => {
  const { database } = context
  const batch = database.batch()

  batchCreateUserPhoneNumber(context, batch, {
    phoneNumberId,
    userId
  })

  const phoneNumberRef = await batchUpdatePhoneNumber(context, batch, phoneNumberId, {
    type: 'user'
  })

  await commitBatch(batch)

  const phoneNumberDoc = await phoneNumberRef.get()

  return {
    id: phoneNumberDoc.id,
    ...phoneNumberDoc.data()
  }
}

export default claimUserPhoneNumber
