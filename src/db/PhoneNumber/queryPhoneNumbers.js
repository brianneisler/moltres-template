import { PhoneNumber } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry, isUndefined } from '../../utils/data'

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
