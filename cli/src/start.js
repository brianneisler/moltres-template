import { createContext } from 'moltres-tools'
import { createCli, createLogger } from './util'

const start = async () => {
  let context = await createContext()
  const cli = createCli(context.plugins)
  const logger = createLogger(cli)
  context = context.merge({
    logger
  })
  try {
    await cli.start(context)
    if (!cli.isInteractive) {
      logger.log('process exiting')
      process.exit(0)
    }
  } catch (error) {
    logger.error('An unexpected error occurred.')
    logger.log(error)
    process.exit(1)
  }
}

export default start
