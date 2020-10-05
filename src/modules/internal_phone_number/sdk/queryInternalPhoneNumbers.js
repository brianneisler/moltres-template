import { buildQuery } from '../../../utils/db'
import { curry } from '../../../utils/lang'
import { InternalPhoneNumber } from '../schemas'

const queryInternalPhoneNumbers = curry((context, queryParams, queryOptions) =>
  buildQuery((query) => query, InternalPhoneNumber, context, queryOptions)
)

export default queryInternalPhoneNumbers
