import {
  hashPhoneNumber,
  vaidateAndFormatPhoneNumber
} from 'moltes/phone_number'
import { batchCreateEntity } from 'moltres/core'

import { PhoneNumber } from '../schemas'

const batchCreatePhoneNumber = (context, batch, data) => {
  const phoneNumber = vaidateAndFormatPhoneNumber(data.phoneNumber)
  const hash = hashPhoneNumber(phoneNumber)

  return batchCreateEntity(PhoneNumber, context, batch, {
    ...data,
    hash,
    phoneNumber
  })
}

export default batchCreatePhoneNumber
