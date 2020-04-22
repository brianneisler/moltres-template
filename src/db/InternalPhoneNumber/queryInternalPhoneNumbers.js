import { InternalPhoneNumber } from './schemas'
import { buildQuery } from '../../utils/db'
import { curry } from '../../utils/data'

const queryInternalPhoneNumbers = curry((context, queryParams, queryOptions) =>
  buildQuery((query) => query, InternalPhoneNumber, context, queryOptions)
)

export default queryInternalPhoneNumbers