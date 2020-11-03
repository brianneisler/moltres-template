const createContext = (context = {}) => ({
  config: context.config || {},
  isContext: true,
  logger: context.logger || console,
  ...context
})

export default createContext
