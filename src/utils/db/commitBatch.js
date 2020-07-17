import { ACCESS_DENIED } from '../../constants/Code'
import { delay, isPromise } from '../lang'
import expected from '../error/expected'
import isPermissionsError from './isPermissionsError'

const isDisconnectError = (error) => {
  return error.message.includes('ERR_STREAM_WRITE_AFTER_END')
}

const commitBatch = async (batch, retry = 0) => {
  if (isPromise(batch)) {
    batch = await batch
  }
  try {
    return await batch.commit()
  } catch (error) {
    if (isDisconnectError(error)) {
      if (retry <= 3) {
        retry = retry + 1
        return delay(async () => commitBatch(batch, retry), 1000 * retry)
      }
    }
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
