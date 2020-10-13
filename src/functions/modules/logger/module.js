import { createLogger } from '../../../utils/logger'
import { logger } from '../../../utils/logger/express-winston'

const mod = () => ({
  setupMiddleware() {
    // TODO BRN: Pull this from the context instead of creating a new logger
    const winstonInstance = createLogger()
    return logger({
      colorize: process.env.NODE_ENV === 'development',
      expressFormat: true,
      winstonInstance
    })
  }
})

export default mod
