import { PhoneNumberClaim } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/lang'

const queryPhoneNumberClaims = curry(
  (context, { phoneNumberId, userId }, queryOptions) =>
    buildQuery(
      (query) => {
        if (!isUndefined(phoneNumberId)) {
          query = query.where('phoneNumberId', '==', phoneNumberId)
        }
        if (!isUndefined(userId)) {
          query = query.where('userId', '==', userId)
        }
        return query
      },
      PhoneNumberClaim,
      context,
      queryOptions
    )
)

export default queryPhoneNumberClaims
