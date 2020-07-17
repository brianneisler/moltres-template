import tools from 'firebase-tools'
import logger from 'firebase-tools/lib/logger'
import { keys, map, prop } from 'ramda'
import winston from 'winston'

class DeployLogger extends winston.Transport {
  constructor(options) {
    super()
    this.name = 'DeployLogger'
    this.level = options.level || 'info'
    this.context = options.context
  }

  log(level, msg, meta, callback) {
    this.context.log(msg)
    callback(null, true)
  }
}

const setupLogger = () => {
  logger.add(DeployLogger, {
    colorize: true,
    context: {
      log: (...args) => {
        console.log(...args) // eslint-disable-line no-console
      }
    },
    level: process.env.DEBUG ? 'debug' : 'info',
    showLevel: false
  })
}

const convertConfig = (config) =>
  map((key) => {
    const value = prop(key, config)
    return `${key}=${value}`
  }, keys(config))

const configSet = async (input) => {
  setupLogger()
  const config = convertConfig(input.config)
  await tools.functions.config.set(config, {
    cwd: input.cwd,
    project: input.project,
    token: input.token
  })
}

const deploy = async (input) => {
  setupLogger()
  await tools.deploy({
    cwd: input.cwd,
    project: input.project,
    token: input.token
  })
}

const commands = {
  configSet,
  deploy
}

process.on('message', (message) => {
  const command = prop(message.type, commands)
  if (!command) {
    throw new Error(`Could not find command of type ${message.type}`)
  }
  command(message.input)
    .then(() => process.exit())
    .catch((error) => {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    })
})
