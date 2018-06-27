import { forEachObjIndexed, is } from 'moltres-utils'

const startStore = (store) => {
  forEachObjIndexed((module) => {
    const { start } = module
    if (is(Function, start)) {
      start(store)
    }
  }, store.getModules())
  return store
}

export default startStore
