import { forEachObjIndexed, isFunction } from 'moltres-utils'

const setupStore = (store) => {
  forEachObjIndexed((module) => {
    const { setup } = module
    if (isFunction(setup)) {
      setup(store)
    }
  }, store.getModules())
  console.log('modules have been setup') // eslint-disable-line no-console
  return store
}

export default setupStore
