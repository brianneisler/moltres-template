import { initializeStorage } from 'moltres-utils'

const createModule = (config) => ({
  setup: (store, module) => {
    const app = store.getContext('app')
    const storage = initializeStorage({ app }, config)
    store.setContext('storage', storage)
    return store
  }
})

export default createModule
