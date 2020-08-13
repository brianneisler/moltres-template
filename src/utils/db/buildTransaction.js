import { ACCESS_DENIED } from '../../constants/Code'
import expected from '../error/expected'

import isPermissionsError from './isPermissionsError'

const buildTransaction = async (context, builder) => {
  const { database } = context
  try {
    return database.runTransaction((transaction) =>
      builder({
        ...context,
        transaction
      })
    )
  } catch (error) {
    if (isPermissionsError(error)) {
      throw expected({
        causes: [error],
        code: ACCESS_DENIED,
        message: error.message
      })
    }
    throw error
  }
}

export default buildTransaction
