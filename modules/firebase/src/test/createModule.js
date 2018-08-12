import baseCreateModule from '../createModule'
import initializeApp from '../initializeApp'
import initializeAdminApp from '../util/initializeAdminApp'

const createModule = (config) => ({
  ...baseCreateModule(config),
  initializeApp: (appConfig) =>
    initializeAdminApp({
      ...appConfig,
      prefix: 'test'
    }),
  setup: (store, instance) => {
    const adminApp = initializeAdminApp({
      ...config,
      prefix: 'admin'
    })
    const app = initializeApp(
      {
        adminApp,
        ...config
      },
      instance
    )
    const database = app.database()
    store.setContext('adminApp', adminApp)
    store.setContext('app', app)
    store.setContext('database', database)
    return store
  },
  finally: async (store) => {
    const { adminApp, app } = store.getContext()
    adminApp.database().goOffline()
    app.database().goOffline()
  }
})

export default createModule
