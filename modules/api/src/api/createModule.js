import { setupApi } from './util'

const createModule = () => {
  let api
  const getApi = () => {
    return api
  }

  const setup = (store) => {
    api = setupApi(store)
    store.setContext('api', api)
    return store
  }

  return {
    getApi,
    setup
  }
}

export default createModule
