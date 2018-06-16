import { setupApi } from './util'

const module = () => {
  let api
  const getApi = () => {
    return api
  }

  const setup = (store) => {
    api = setupApi(store)
    store.setContext({
      api
    })
    return store
  }

  return {
    getApi,
    setup
  }
}

export default module
