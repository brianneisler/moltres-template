import { createLogger } from '../../../utils/logger'
import expressWinston from '../../../utils/logger/express-winston'

const mod = {
  setupMiddleware: () => {
    const winstonInstance = createLogger()
    return expressWinston.errorLogger({
      expressFormat: true,
      skip: (request, response, error) =>
        error.statusCode && error.statusCode < 400,
      winstonInstance
    })
  }
}

export default mod
