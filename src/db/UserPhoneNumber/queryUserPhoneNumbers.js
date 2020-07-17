import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/lang'

import { UserPhoneNumber } from './schemas'

const queryUserPhoneNumbers = curry(
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
      UserPhoneNumber,
      context,
      queryOptions
    )
)

export default queryUserPhoneNumbers
