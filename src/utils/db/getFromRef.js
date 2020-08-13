import { Code, StatusCode } from '../../constants'
import { expected } from '../error'

import formatDocument from './formatDocument'
import isPermissionsError from './isPermissionsError'
import refGet from './refGet'

const getFromRef = async (context, ref, options = {}) => {
  const { logger } = context
  try {
    const document = await refGet(context, ref)
    if (!document.exists) {
      throw expected({
        code: Code.NOT_FOUND,
        message: `Could not get document at ${ref.path}`,
        statusCode: StatusCode.NOT_FOUND
      })
    }
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

export default getFromRef
