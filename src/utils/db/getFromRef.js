import { Code, StatusCode } from '../../constants'
import expected from '../error/expected'
import formatDocument from './formatDocument'

const getFromRef = async ({ logger }, ref, options = {}) => {
  try {
    const document = await ref.get()
    if (!document.exists) {
      throw expected({
        code: Code.NOT_FOUND,
        message: `Could not find document at ${ref.path}`,
        statusCode: StatusCode.NOT_FOUND
      })
    }
    return formatDocument(document, options)
  } catch (error) {
    if (error.message.includes('Missing or insufficient permissions')) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn('Permissions error - returning null from query:', error)
      }
      throw expected({
        code: Code.ACCESS_DENIED,
        message: error.message,
        statusCode: Code.STATUS_CODE
      })
    }
    throw error
  }
}

export default getFromRef
