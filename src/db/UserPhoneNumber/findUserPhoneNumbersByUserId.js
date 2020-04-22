import { findAllFromQuery } from '../../utils/db'
import queryUserPhoneNumbers from './queryUserPhoneNumbers'

const findUserPhoneNumbersByUserId = async (context, userId, queryOptions = {}) =>
  findAllFromQuery(context, queryUserPhoneNumbers(context, { userId }, queryOptions), queryOptions)

export default findUserPhoneNumbersByUserId
