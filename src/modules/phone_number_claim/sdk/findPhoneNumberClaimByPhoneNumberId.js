import { findOneFromQuery } from 'moltres/db'

import queryPhoneNumberClaims from './queryPhoneNumberClaims'

const findPhoneNumberClaimByPhoneNumberId = async (
  context,
  phoneNumberId,
  queryOptions = {}
) => {
  queryOptions = { ...queryOptions, limit: 1 }
  return findOneFromQuery(
    context,
    queryPhoneNumberClaims(context, { phoneNumberId }, queryOptions),
    queryOptions
  )
}

export default findPhoneNumberClaimByPhoneNumberId
