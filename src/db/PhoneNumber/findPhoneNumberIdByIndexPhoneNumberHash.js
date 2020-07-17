import { collection } from '../../utils/db'
import Index from '../Index/schemas/Index'

import { PhoneNumber } from './schemas'

// NOTE BRN: This does not have options because it is an index lookup, not a
// record lookup

const findPhoneNumberIdByIndexPhoneNumberHash = async (context, hash) => {
  const Indexes = collection(Index, context)
  const ref = Indexes.doc(`${PhoneNumber.collectionName}/hash/${hash}`)
  const document = await ref.get()
  if (!document.exists) {
    return null
  }
  return document.data().value
}

export default findPhoneNumberIdByIndexPhoneNumberHash
