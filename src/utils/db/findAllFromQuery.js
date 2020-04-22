import { ACCESS_DENIED } from '../../constants/Code'
import expected from '../error/expected'
import formatSnapshot from './formatSnapshot'

const findAllFromQuery = async ({ logger }, query, queryOptions = {}) => {
  if (!query) {
    return {}
  }
  try {
    const snapshot = await query.get()
    return formatSnapshot(snapshot, queryOptions)
  } catch (error) {
    if (error.message.includes('Missing or insufficient permissions')) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn('Permissions error - returning null from query:', error)
      }
      throw expected({
        code: ACCESS_DENIED,
        message: error.message
      })
    }
    throw error
  }
}

export default findAllFromQuery
