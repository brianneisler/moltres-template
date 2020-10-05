import { findAllFromQuery } from '../../../utils/db'

import querySMSChannels from './querySMSChannels'

const findSMSChannelsByUserPhoneNumberId = async (
  context,
  userPhoneNumberId,
  queryOptions = {}
) =>
  findAllFromQuery(
    context,
    querySMSChannels(context, { userPhoneNumberId }, queryOptions),
    queryOptions
  )

export default findSMSChannelsByUserPhoneNumberId
