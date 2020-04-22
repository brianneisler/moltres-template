import { Code, StatusCode } from '../../constants'
import expected from '../error/expected'
import formatDocument from './formatDocument'

const findFromRef = async ({ logger }, ref, options = {}) => {
  try {
    const document = await ref.get()
    return formatDocument(document, options)
  } catch (error) {
    if (error.message.includes('Missing or insufficient permissions')) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn('Permissions error - returning null from query:', error)
      }
      throw expected({
        code: Code.ACCESS_DENIED,
        message: error.message,
        statusCode: StatusCode.ACCESS_DENIED
      })
    }
    throw error
  }
}

export default findFromRef
