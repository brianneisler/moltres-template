import * as testing from '@firebase/testing'

const initializeTestAdminApp = ({ config, namespace }) => {
  if (!namespace) {
    throw new TypeError(`No namespace was provided`)
  }
  if (!config.firebase) {
    throw new TypeError(`No firebase config was provided`)
  }
  const appConfig = {
    ...config.firebase
  }

  return testing.initializeAdminApp(appConfig, namespace)
}

export default initializeTestAdminApp
