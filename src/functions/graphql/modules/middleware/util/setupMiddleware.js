import { unexpected } from 'moltres/error'
import {
  forEach,
  getProperty,
  isFunction,
  isObject,
  map
} from 'moltres/lang'

const setupMiddleware = (store, app, order) => {
  const modules = map((name) => {
    const mod = getProperty(name, store.getModules())
    if (!mod) {
      throw unexpected({
        message: `Module with the name '${name}', does not exist`
      })
    }
    return {
      name,
      ...mod
    }
  }, order)
  // NOTE BRN: We pass ALL modules to the middleware setup functions instead of
  // the limited set that this method receives.
  forEach((mod) => {
    try {
      const middleware = mod.setupMiddleware(store)
      if (isFunction(middleware)) {
        app.use(middleware)
      } else if (isObject(middleware)) {
        if (!isFunction(middleware.handler)) {
          throw new Error(`middleware must define a handler ${middleware}`)
        }
        if (middleware.path) {
          app.use(middleware.path, middleware.handler)
        } else {
          app.use(middleware.handler)
        }
      }
    } catch (error) {
      throw unexpected({
        causes: [error],
        message: `An error occurred while trying to setup middleware for module '${mod.name}'`
      })
    }
  }, modules)
}

export default setupMiddleware
