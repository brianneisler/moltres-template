import contextModule from '../../../../core/modules/context'

const mod = {
  ...contextModule,
  setupMiddleware: (store) => {
    return (request, response, next) => {
      const context = store.getContext()
      request.context = context
      request.adminContext = context.admin
      next()
    }
  }
}

export default mod
