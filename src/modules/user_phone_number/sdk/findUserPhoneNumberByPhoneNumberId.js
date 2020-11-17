import { findOneFromQuery } from 'moltres/db'
import { assoc } from 'moltres/lang'

import queryUserPhoneNumbers from './queryUserPhoneNumbers'

const findUserPhoneNumberByPhoneNumberId = async (
  context,
  phoneNumberId,
  queryOptions = {}
) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryUserPhoneNumbers(context, { phoneNumberId }, queryOptions),
    queryOptions
  )
}

export default findUserPhoneNumberByPhoneNumberId
