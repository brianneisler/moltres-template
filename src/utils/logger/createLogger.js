import { createLogger as createWinstonLogger, format } from 'winston'

import ConsoleLoggerTransport from './ConsoleLoggerTransport'

const createLogger = () => {
  let formats
  if (process.env.NODE_ENV === 'development') {
    formats = [format.timestamp(), format.colorize(), format.simple()]
  } else {
    formats = [format.timestamp(), format.simple()]
  }
  return createWinstonLogger({
    level: 'info',
    transports: [
      new ConsoleLoggerTransport({
        format: format.combine(...formats),
        meta: true
      })
    ]
  })
}

export default createLogger
