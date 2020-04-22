const initializeAdminApp = ({ config, firebase, namespace, testUser }) => {
  if (!namespace) {
    throw new TypeError(`No namespace was provided`)
  }
  if (!firebase) {
    throw new TypeError(`No firebase library was provided`)
  }
  if (!config.firebase) {
    throw new TypeError(`No firebase config was provided`)
  }
  const { serviceAccount } = config
  let appConfig = {
    credential: firebase.credential.cert(serviceAccount),
    ...config.firebase
  }
  if (testUser) {
    appConfig = {
      ...appConfig,
      databaseAuthVariableOverride: {
        uid: testUser.uid
      }
    }
  }

  return firebase.initializeApp(appConfig, namespace)
}

export default initializeAdminApp
