import { commitBatch, formatDocument } from '../../utils/db'
import batchCreateInternalPhoneNumber from './batchCreateInternalPhoneNumber'
import batchCreatePhoneNumber from '../PhoneNumber/batchCreatePhoneNumber'

const createInternalPhoneNumber = async (context, data) => {
  const { database } = context
  const batch = database.batch()
  const phoneNumberRef = batchCreatePhoneNumber(context, batch, {
    ...data,
    type: 'internal'
  })
  batchCreateInternalPhoneNumber(context, batch, {
    phoneNumberId: phoneNumberRef.id
  })

  await commitBatch(batch)

  const document = await phoneNumberRef.get()
  return formatDocument(document)
}

export default createInternalPhoneNumber
