import { append, concat, isArray, reduce, values } from '../../utils/lang'

const filterMiddleware = (modules) =>
  reduce(
    (middlewares, module) => {
      const { middleware } = module
      if (middleware) {
        if (isArray(middleware)) {
          return concat(middlewares, middleware)
        }
        return append(middleware, middlewares)
      }
      return middlewares
    },
    [],
    values(modules)
  )

export default filterMiddleware
