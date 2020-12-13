import { context as contextModule } from 'moltres/core/modules'

// HACK BRN: For right now we extend the module in this way. Instead, it would
// be better to use code splitting for this but we need to setup webpack for
// node first before we can do that...
const mod = (...args) => ({
  ...contextModule(...args),
  setupMiddleware: (store) => {
    return (request, response, next) => {
      const context = store.getContext()
      request.context = context
      request.adminContext = context.admin
      next()
    }
  }
})

export default mod
