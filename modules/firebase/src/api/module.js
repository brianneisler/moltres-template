import initializeFirebaseAdminApp from './initializeFirebaseAdminApp'

const module = (config) => ({
  setup: (store) => {
    const app = initializeFirebaseAdminApp('default', config)
    const database = app.database()
    store.setContext({
      app,
      database
    })
    return store
  }
})

export default module
