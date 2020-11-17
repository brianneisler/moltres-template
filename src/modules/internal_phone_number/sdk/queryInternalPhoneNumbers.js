import { buildQuery } from 'moltres/db'
import { curry } from 'moltres/lang'

import { InternalPhoneNumber } from '../schemas'

const queryInternalPhoneNumbers = curry((context, queryParams, queryOptions) =>
  buildQuery((query) => query, InternalPhoneNumber, context, queryOptions)
)

export default queryInternalPhoneNumbers
