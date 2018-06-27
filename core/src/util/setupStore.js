import { forEachObjIndexed, is } from 'moltres-utils'

const setupStore = (store) => {
  forEachObjIndexed((module) => {
    const { setup } = module
    if (is(Function, setup)) {
      setup(store)
    }
  }, store.getModules())
  console.log('modules have been setup') // eslint-disable-line no-console
  return store
}

export default setupStore
