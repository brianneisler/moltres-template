import createModule from '../createModule'
import initializeApp from '../initializeApp'
import initializeAdminApp from '../util/initializeAdminApp'

const module = (config) => ({
  ...createModule(config),
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
    store.setContext({
      adminApp,
      app,
      database
    })
    return store
  },
  finally: async (store) => {
    const { adminApp, app } = store.getContext()
    adminApp.database().goOffline()
    app.database().goOffline()
  }
})

export default module
