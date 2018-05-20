import { createApi } from './util'

const module = ({ firebaseApp }) => {
  let storeCache
  const run = (store) => {
    storeCache = store
  }

  const buildApi = () => {
    const modules = storeCache.getModules()
    return createApi(modules, { firebaseApp })
  }

  return {
    buildApi,
    run
  }
}

export default module
