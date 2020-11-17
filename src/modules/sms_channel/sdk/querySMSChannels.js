import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'
import { SMSChannel } from '../schemas'

const querySMSChannels = curry(
  (context, { internalPhoneNumberId, userPhoneNumberId }, queryOptions) =>
    buildQuery(
      (query) => {
        if (!isUndefined(internalPhoneNumberId)) {
          query = query.where(
            'internalPhoneNumberId',
            '==',
            internalPhoneNumberId
          )
        }
        if (!isUndefined(userPhoneNumberId)) {
          query = query.where('userPhoneNumberId', '==', userPhoneNumberId)
        }
        return query
      },
      SMSChannel,
      context,
      queryOptions
    )
)

export default querySMSChannels
