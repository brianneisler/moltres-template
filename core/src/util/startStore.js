import { forEachObjIndexed, isFunction } from 'moltres-utils'

const startStore = (store) => {
  forEachObjIndexed((module) => {
    const { start } = module
    if (isFunction(start)) {
      start(store)
    }
  }, store.getModules())
  return store
}

export default startStore
