import { Code, StatusCode } from '../../constants'
import expected from '../error/expected'

const formatDocument = (document, options = {}) => {
  if (!document || !document.exists) {
    if (options.getOne) {
      throw expected({
        code: Code.NOT_FOUND,
        message: `Could not get document at ${ref.path}`,
        statusCode: StatusCode.NOT_FOUND
      })
    }
    return null
  }
  const data = document.data()
  if (!options.includeRemoved && data.removedAt) {
    return null
  }
  return {
    id: document.id,
    ...data
  }
}

export default formatDocument
