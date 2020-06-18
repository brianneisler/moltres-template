import { append, concat, isArray, reduce, values } from '../../../../utils/lang'

const filterRoutes = (modules) =>
  reduce(
    (accumRoutes, module) => {
      const { routes } = module
      if (routes) {
        if (isArray(routes)) {
          return concat(accumRoutes, routes)
        }
        return append(routes, accumRoutes)
      }
      return accumRoutes
    },
    [],
    values(modules)
  )

export default filterRoutes
