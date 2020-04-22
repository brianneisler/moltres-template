import { createLogger } from '../../../utils/logger'
import expressWinston from '../../../utils/logger/express-winston'

const mod = {
  setupMiddleware: () => {
    // TODO BRN: Pull this from the context instead of creating a new logger
    const winstonInstance = createLogger()
    return expressWinston.logger({
      colorize: process.env.NODE_ENV === 'development',
      expressFormat: true,
      winstonInstance
    })
  }
}

export default mod
