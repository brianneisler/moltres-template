import { batchCreateEntity } from '../../../core/sdk'
import { PhoneNumber } from '../schemas'

import formatPhoneNumber from './formatPhoneNumber'
import hashPhoneNumber from './hashPhoneNumber'

const batchCreatePhoneNumber = (context, batch, data) => {
  const phoneNumber = formatPhoneNumber(data.phoneNumber)
  const hash = hashPhoneNumber(phoneNumber)

  return batchCreateEntity(PhoneNumber, context, batch, {
    ...data,
    hash,
    phoneNumber
  })
}

export default batchCreatePhoneNumber
