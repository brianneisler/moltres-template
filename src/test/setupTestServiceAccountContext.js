import { createContext } from '../context'
import { signInWithCustomToken } from '../utils/auth'
import createTestContext from './createTestContext'

const setupTestServiceAccountContext = async (adminContext) => {
  const { config, serviceAccount } = adminContext

  // NOTE BRN: We generate a new namespace on a per test run basis. This way the
  // tests do not share a firebase app and it allows them to have separate
  // states when it comes to the db and authentication.
  const { runId } = config.test
  const namespace = `ServiceAccount:${serviceAccount.id}.test:${runId}`
  if (config.test.integration) {
    const context = await createContext({
      config,
      namespace,
      serviceAccount: adminContext.serviceAccount,
      source: `${config.api.url}/service_account/${adminContext.serviceAccount.id}?test=${runId}`,
      storage: adminContext.storage
    })
    await signInWithCustomToken(context, adminContext.token)
    return context
  }
  return createTestContext({
    config,
    namespace,
    serviceAccount: adminContext.serviceAccount,
    source: `${config.api.url}/service_account/${adminContext.serviceAccount.id}?test=${runId}`,
    storage: adminContext.storage,
    testAuth: {
      serviceAccountId: adminContext.serviceAccount.id,
      uid: adminContext.serviceAccount.id
    }
  })
}

export default setupTestServiceAccountContext
