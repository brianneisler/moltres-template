import { createAdminContext, createContext } from '../context'
import { signInWithIdToken } from '../utils/auth'
import { isTestAppConfigured, loadConfig } from '../utils/config'
import { uuidv4 } from '../utils/lang'

const setupCliContexts = async (modules) => {
  const config = await loadConfig({ modules })
  const namespace = uuidv4()
  const adminContext = await createAdminContext({
    config,
    namespace: `admin.cli:${namespace}`,
    source: `${config.api.url}/admin?cli=true` // TODO BRN: Attach mac/ip identifiers
  })
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
    namespace: `cli:${namespace}`,
    serviceAccount: adminContext.serviceAccount,
    source: `${config.api.url}/service_account/${adminContext.serviceAccount.id}?cli=true`,
    storage: adminContext.storage,
    testAuth
  })
  const { logger } = context
  logger.debug('signing in with custom token')
  await signInWithIdToken(context, adminContext.token)

  return {
    adminContext,
    context
  }
}

export default setupCliContexts
