const createLogger = (instance) => ({
  log: (...args) => instance.log(...args)
})

export default createLogger
