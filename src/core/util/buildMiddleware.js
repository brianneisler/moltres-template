import { List } from 'immutable'

import { isArray, isFunction, reduce, values } from '../../utils/lang'

const filterMiddleware = (modules) =>
  reduce(
    (middlewares, module) => {
      const { middleware } = module
      if (middleware) {
        if (isArray(middleware)) {
          return middlewares.concat(middleware)
        }
        return middlewares.push(middleware)
      }
      return middlewares
    },
    List([]),
    values(modules)
  )

const flattenMiddleware = (middlewares) =>
  middlewares.map((middleware) => {
    if (isFunction(middleware)) {
      return middleware
    }
    return middleware.middleware
  })

const buildMiddleware = (modules) => {
  const middlewares = filterMiddleware(modules)
  let grouped = middlewares.groupBy((middleware) => {
    if (isFunction(middleware)) {
      return 1
    }
    if (middleware.middleware) {
      const { insert } = middleware
      if (!insert || insert === 'append' || insert === 'prepend') {
        return 1
      }
      if (insert === 'last') {
        return 2
      }
      if (insert === 'first') {
        return 0
      }
      throw new Error('Unknown middleware insert method')
    }
    throw new Error(
      "middleware must either be a function or an object with a 'middleware' property"
    )
  })
  grouped = grouped.update(1, (middlewareList) =>
    middlewareList.reduce((acc, middleware) => {
      const { insert } = middleware
      if (insert === 'prepend') {
        return acc.unshift(middleware)
      }
      return acc.push(middleware)
    }, List([]))
  )

  return flattenMiddleware(
    grouped.get(0).concat(grouped.get(1)).concat(grouped.get(2))
  ).toArray()
}

export default buildMiddleware
