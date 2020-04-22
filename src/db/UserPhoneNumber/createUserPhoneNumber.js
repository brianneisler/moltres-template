import { commitBatch, getFromRef } from '../../utils/db'
import batchCreatePhoneNumber from '../PhoneNumber/batchCreatePhoneNumber'
import batchCreateUserPhoneNumber from './batchCreateUserPhoneNumber'

const createUserPhoneNumber = async (context, data) => {
  const { database } = context
  const batch = database.batch()
  const phoneNumberRef = batchCreatePhoneNumber(context, batch, {
    ...data,
    type: 'user'
  })
  batchCreateUserPhoneNumber(context, batch, {
    phoneNumberId: phoneNumberRef.id
  })

  await commitBatch(batch)

  return getFromRef(context, phoneNumberRef)
}

export default createUserPhoneNumber
