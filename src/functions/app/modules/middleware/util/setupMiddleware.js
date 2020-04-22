import { forEach, getProp, map } from '../../../../../utils/data'
import { unexpected } from '../../../../../utils/error'

const setupMiddleware = (store, app, order) => {
  const modules = map((name) => {
    const mod = getProp(name, store.getModules())
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
      app.use(mod.setupMiddleware(store))
    } catch (error) {
      throw unexpected({
        causes: [error],
        message: `An error occurred while trying to setup middleware for module '${mod.name}'`
      })
    }
  }, modules)
}

export default setupMiddleware
