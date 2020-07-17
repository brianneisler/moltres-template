import { findAllFromQuery } from '../../utils/db'

import queryPhoneNumberClaims from './queryPhoneNumberClaims'

const findPhoneNumberClaimsByUserId = async (
  context,
  userId,
  queryOptions = {}
) =>
  findAllFromQuery(
    context,
    queryPhoneNumberClaims(context, { userId }, queryOptions),
    queryOptions
  )

export default findPhoneNumberClaimsByUserId
