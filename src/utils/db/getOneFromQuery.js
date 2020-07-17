import { ACCESS_DENIED, PENDING_WRITES } from '../../constants/Code'
import expected from '../error/expected'
import formatSnapshot from './formatSnapshot'
import isPermissionsError from './isPermissionsError'

const getOneFromQuery = async ({ logger }, query, options = {}) => {
  try {
    // TODO BRN: This try/catch may cause problems because it will obscure query
    // problems (wrong where queries) and actual permission denies
    const snapshot = await query.get()
    if (options.disallowPendingWrites && snapshot.metadata.hasPendingWrites) {
      throw expected({
        code: PENDING_WRITES,
        message: 'Writes to the DB for this record are still pending'
      })
    }
    return formatSnapshot(snapshot, { ...options, getOne: true })
  } catch (error) {
    if (isPermissionsError(error)) {
      if (process.env.NODE_ENV !== 'production') {
        // TODO BRN: Pull logger from context to log this
        logger.warn('Permissions error:', error)
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

export default getOneFromQuery
