import { setupApi } from './util'

const module = () => {
  let api
  const getApi = () => {
    return api
  }

  const setup = (store) => {
    api = setupApi(store)
  }

  return {
    getApi,
    setup
  }
}

export default module
