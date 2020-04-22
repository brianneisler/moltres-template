import { commitBatch, formatDocument } from '../../utils/db'
import batchCreatePhoneNumber from '../PhoneNumber/batchCreatePhoneNumber'
import batchCreatePhoneNumberClaim from './batchCreatePhoneNumberClaim'

const createUnclaimedPhoneNumber = async (context, data) => {
  const { database } = context
  const batch = database.batch()
  const phoneNumberRef = batchCreatePhoneNumber(context, batch, {
    phoneNumber: data.phoneNumber,
    type: 'unclaimed'
  })
  batchCreatePhoneNumberClaim(context, batch, {
    phoneNumberId: phoneNumberRef.id,
    userId: data.userId
  })

  await commitBatch(batch)

  const document = await phoneNumberRef.get()
  return formatDocument(document)
}

export default createUnclaimedPhoneNumber
