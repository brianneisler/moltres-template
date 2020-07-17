import { Code, StatusCode } from '../../constants'
import expected from '../error/expected'

import formatDocument from './formatDocument'
import isPermissionsError from './isPermissionsError'

const findFromRef = async ({ logger }, ref, options = {}) => {
  try {
    const document = await ref.get()
    return formatDocument(document, options)
  } catch (error) {
    if (isPermissionsError(error)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn('Permissions error - returning null from query:', error)
      }
      throw expected({
        causes: [error],
        code: Code.ACCESS_DENIED,
        message: error.message,
        statusCode: StatusCode.ACCESS_DENIED
      })
    }
    throw error
  }
}

export default findFromRef
