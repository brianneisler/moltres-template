import initializeApp from './initializeApp'

const createModule = (config) => ({
  setup: (store, module) => {
    const app = initializeApp(config, module)
    const database = app.database()
    store.setContext({
      app,
      database
    })
    return store
  },
  finally: async (store) => {
    const { database } = store.getContext()
    database.goOffline()
  }
})

export default createModule
