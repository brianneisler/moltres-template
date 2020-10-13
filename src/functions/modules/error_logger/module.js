import { createLogger } from '../../../utils/logger'
import { errorLogger } from '../../../utils/logger/express-winston'

const mod = () => ({
  setupMiddleware() {
    const winstonInstance = createLogger()
    return errorLogger({
      expressFormat: true,
      skip: (request, response, error) =>
        error.statusCode && error.statusCode < 400,
      winstonInstance
    })
  }
})

export default mod
