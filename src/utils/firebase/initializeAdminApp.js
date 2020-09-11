import { invariant, isObject, isString } from '../lang'

const initializeAdminApp = ({ config, firebase, namespace, testUser }) => {
  invariant(isString(namespace), 'namespace must be a defined String')
  invariant(isObject(firebase), 'firebase library must be defined on context')
  invariant(isObject(config), 'config must be a defined Object')
  invariant(
    isObject(config.firebase),
    'firebase config must be a defined Object'
  )
  invariant(
    isString(config.firebase.projectId),
    'firebase projectId must be a defined String'
  )

  const { serviceAccount } = config.firebase
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
