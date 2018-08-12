import baseCreateModule from '../createModule'
import initializeAdminApp from '../util/initializeAdminApp'

const createModule = (config) => ({
  ...baseCreateModule(config),
  initializeApp: (appConfig) =>
    initializeAdminApp({
      ...appConfig,
      prefix: 'api'
    })
})

export default createModule
