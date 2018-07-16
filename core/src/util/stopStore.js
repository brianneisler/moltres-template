import { isFunction, map } from 'moltres-utils'

const stopStore = async (store) => {
  await Promise.all(
    map(async (module) => {
      const { stop } = module
      if (isFunction(stop)) {
        await stop(store)
      }
    }, store.getModules())
  )

  await Promise.all(
    map(async (module) => {
      if (isFunction(module.finally)) {
        await module.finally(store)
      }
    }, store.getModules())
  )
  return store
}

export default stopStore
