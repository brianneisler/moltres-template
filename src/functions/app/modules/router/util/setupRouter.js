import { isFunction, reduce, values } from '../../../../../utils/lang'

const setupRouter = (router, store) => {
  router = reduce(
    (accRouter, mod) => {
      if (isFunction(mod.setupRouter)) {
        return mod.setupRouter(accRouter, store)
      }
      return router
    },
    router,
    values(store.getModules())
  )

  // NOTE BRN: This requires a specific order which is why it's not done using a
  // module

  // TODO BRN: This is an ugly hack. Would be better to have some sort of ording
  // mechanism for setting up the router.

  const modules = store.getModules()
  router = modules.api.setupAPIRouter(router)
  router = modules.static.setupStaticRouter(router)
  router = modules.ssr.setupSSRRouter(router, store)
  return router
}

export default setupRouter
