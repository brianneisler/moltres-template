import { forEachObjIndexed, is } from 'ramda'

const startStore = (store) => {
  forEachObjIndexed(
    (module) => {
      const { start } = module
      if (is(Function, start)) {
        start(store)
      }
    },
    store.getModules()
  )
  return store
}

export default startStore
