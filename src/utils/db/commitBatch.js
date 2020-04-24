import { ACCESS_DENIED } from '../../constants/Code'
import { isPromise } from '../data'
import expected from '../error/expected'
import isPermissionsError from './isPermissionsError'

const commitBatch = async (batch) => {
  if (isPromise(batch)) {
    batch = await batch
  }
  try {
    return await batch.commit()
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

export default commitBatch
