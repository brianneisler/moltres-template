import { ACCESS_DENIED } from '../../constants/Code'
import expected from '../error/expected'

const commitBatch = async (batch) => {
  try {
    return await batch.commit()
  } catch (error) {
    if (
      error.message.includes('Missing or insufficient permissions') ||
      error.message.includes('PERMISSION_DENIED')
    ) {
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
