import { findOneFromQuery } from '../../utils/db'

import querySMSChannels from './querySMSChannels'

const findSMSChannelByUserAndInternalPhoneNumberIds = async (
  context,
  userPhoneNumberId,
  internalPhoneNumberId,
  queryOptions = {}
) => {
  queryOptions = {
    ...queryOptions,
    limit: 1
  }
  return findOneFromQuery(
    context,
    querySMSChannels(
      context,
      {
        internalPhoneNumberId,
        userPhoneNumberId
      },
      queryOptions
    ),
    queryOptions
  )
}

export default findSMSChannelByUserAndInternalPhoneNumberIds
