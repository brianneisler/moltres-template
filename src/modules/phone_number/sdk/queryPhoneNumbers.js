import { buildQuery } from 'moltres/db'
import { curry, isUndefined } from 'moltres/lang'

import { PhoneNumber } from '../schemas'

const queryPhoneNumbers = curry((context, { hash }, queryOptions) =>
  buildQuery(
    (query) => {
      if (!isUndefined(hash)) {
        query = query.where('hash', '==', hash)
      }
      return query
    },
    PhoneNumber,
    context,
    queryOptions
  )
)

export default queryPhoneNumbers
