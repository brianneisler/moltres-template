import { ACCESS_DENIED } from '../../constants/Code'
import expected from '../error/expected'
import formatSnapshot from './formatSnapshot'
import isPermissionsError from './isPermissionsError'

const findAllFromQuery = async ({ logger }, query, queryOptions = {}) => {
  if (!query) {
    return {}
  }
  try {
    const snapshot = await query.get()
    return formatSnapshot(snapshot, queryOptions)
  } catch (error) {
    if (isPermissionsError(error)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn('Permissions error - returning null from query:', error)
      }
      throw expected({
        causes: [error],
        code: ACCESS_DENIED,
        message: error.message
      })
    }
    throw error
  }
}

export default findAllFromQuery
