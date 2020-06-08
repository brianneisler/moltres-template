import { assoc } from '../../utils/data'
import { findOneFromQuery } from '../../utils/db'
import queryUserRoles from './queryUserRoles'

const findUserRoleByUserId = async (context, userId, queryOptions = {}) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(context, queryUserRoles(context, { userId }, queryOptions), queryOptions)
}

export default findUserRoleByUserId
