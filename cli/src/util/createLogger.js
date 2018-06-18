import { green, red, yellow } from 'chalk'
import { map } from 'moltres-utils'

const createLogger = (instance) => ({
  error: (...args) => instance.log(...map(red, args)),
  log: (...args) => instance.log(...args),
  reassure: (...args) => instance.log(...map(green, args)),
  warn: (...args) => instance.log(...map(yellow, args))
})

export default createLogger
