import initializeFirebaseApp from './initializeFirebaseApp'

const module = (config) => ({
  setup: (store) => {
    const app = initializeFirebaseApp('default', config)
    const database = app.database()
    store.setContext({
      app,
      database
    })
    return store
  },
  finally: (store) => {
    const { app } = store.getContext()
    app.database().goOffline()
  }
})

export default module
