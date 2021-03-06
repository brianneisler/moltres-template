import { createContext } from '../context'
import { signInWithIdToken } from '../utils/auth'
import { isTestAppConfigured } from '../utils/config'

const setupTestServiceAccountContext = async (adminContext) => {
  const { config, serviceAccount } = adminContext

  // NOTE BRN: We generate a new namespace on a per test run basis. This way the
  // tests do not share a firebase app and it allows them to have separate
  // states when it comes to the db and authentication.
  const { runId } = config.test
  const namespace = `ServiceAccount:${serviceAccount.id}.test:${runId}`
  const isTestApp = isTestAppConfigured(config)

  // HACK BRN: This testAuth value should really be placed into the auth
  // emulator so that we can change this dynamically without having to specify
  // it before hand
  let testAuth
  if (isTestApp) {
    testAuth = {
      serviceAccountId: adminContext.serviceAccount.id,
      uid: adminContext.serviceAccount.id
    }
  }

  const context = await createContext({
    config,
    namespace,
    serviceAccount: adminContext.serviceAccount,
    source: `${config.api.url}/sdk_account/${adminContext.serviceAccount.id}?test=${runId}`,
    storage: adminContext.storage,
    testAuth
  })

  if (!isTestApp) {
    await signInWithIdToken(context, adminContext.token)
  }
  return context
}

export default setupTestServiceAccountContext
