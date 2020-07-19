import { ACCESS_DENIED } from '../../constants/Code'
import expected from '../error/expected'

import isPermissionsError from './isPermissionsError'

const buildBatch = async (context, builder) => {
  const { database } = context
  try {
    const batch = database.batch()
    await builder(batch)
    return batch
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

export default buildBatch
