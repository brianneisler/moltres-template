import createModule from '../createModule'
import initializeAdminApp from '../util/initializeAdminApp'

const module = (config) => ({
  ...createModule(config),
  initializeApp: (appConfig) =>
    initializeAdminApp({
      ...appConfig,
      prefix: 'api'
    })
})

export default module
