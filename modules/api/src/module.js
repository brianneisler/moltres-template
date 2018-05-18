import { createApi } from './util'

const module = ({ firebaseApp }) => {
  let storeCache
  const run = (store) => {
    storeCache = store
  }

  const buildApi = () => {
    const modules = store.getModules()
    return createApi(modules, { firebaseApp })
  }

  return {
    buildApi,
    configure
  }
}

export default module
