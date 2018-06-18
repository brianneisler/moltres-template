import { append, reduce, values } from 'moltres-utils'

const filterMiddleware = (modules) => reduce(
  (middlewares, module) => {
    const { middleware } = module
    if (middleware) {
      return append(middleware, middlewares)
    }
    return middlewares
  },
  [],
  values(modules)
)

export default filterMiddleware
