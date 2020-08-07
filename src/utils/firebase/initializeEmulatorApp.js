import { Component } from '@firebase/component'
import { LogLevel, setLogLevel } from '@firebase/logger'

/** If this environment variable is set, use it for the database emulator's address. */
const DATABASE_ADDRESS_ENV = 'FIREBASE_DATABASE_EMULATOR_ADDRESS'
/** The default address for the local database emulator. */
const DATABASE_ADDRESS_DEFAULT = 'localhost:9000'
/** The actual address for the database emulator */
const DATABASE_ADDRESS =
  process.env[DATABASE_ADDRESS_ENV] || DATABASE_ADDRESS_DEFAULT

/** If any of environment variable is set, use it for the Firestore emulator. */
const FIRESTORE_ADDRESS_ENVS = [
  'FIRESTORE_EMULATOR_HOST',
  'FIREBASE_FIRESTORE_EMULATOR_ADDRESS'
]
/** The default address for the local Firestore emulator. */
const FIRESTORE_ADDRESS_DEFAULT = 'localhost:8080'
/** The actual address for the Firestore emulator */
const FIRESTORE_ADDRESS = FIRESTORE_ADDRESS_ENVS.reduce(
  (addr, name) => process.env[name] || addr,
  FIRESTORE_ADDRESS_DEFAULT
)

const initializeEmulatorApp = ({
  accessToken,
  databaseName,
  firebase,
  namespace,
  projectId
}) => {
  const appOptions = {}
  if (databaseName) {
    appOptions['databaseURL'] = `http://${DATABASE_ADDRESS}?ns=${databaseName}`
  }
  if (projectId) {
    appOptions['projectId'] = projectId
  }
  const app = firebase.initializeApp(appOptions, namespace)
  if (accessToken) {
    // TODO BRN: Integrate this with the auth emulator
    const mockAuthComponent = new Component(
      'auth-internal',
      () => ({
        addAuthTokenListener: (listener) => {
          // Call listener once immediately with predefined accessToken.
          listener(accessToken)
        },
        getToken: async () => ({ accessToken }),
        getUid: () => null,
        removeAuthTokenListener: () => {}
      }),
      'PRIVATE'
    )

    app._addOrOverwriteComponent(mockAuthComponent)
  }
  if (databaseName) {
    // Toggle network connectivity to force a reauthentication attempt.
    // This mitigates a minor race condition where the client can send the
    // first database request before authenticating.
    app.database().goOffline()
    app.database().goOnline()
  }
  if (projectId) {
    app.firestore().settings({
      host: FIRESTORE_ADDRESS,
      ssl: false
    })
  }
  /**
  Mute warnings for the previously-created database and whatever other
  objects were just created.
 */
  setLogLevel(LogLevel.ERROR)
  return app
}

export default initializeEmulatorApp
