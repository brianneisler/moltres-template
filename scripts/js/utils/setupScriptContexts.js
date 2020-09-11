import { loadProjectConfig } from '../../../src/config'
import { createAdminContext, createContext } from '../../../src/context'
import { signInWithIdToken } from '../../../src/utils/auth'
import { uuidv4 } from '../../../src/utils/lang'

const setupScriptContexts = async () => {
  const config = await loadProjectConfig({ target: 'script' })
  const namespace = uuidv4()
  const adminContext = await createAdminContext({
    config,
    namespace: `admin.script:${namespace}`,
    source: `${config.api.url}/admin?script=true` // TODO BRN: Attach script identifiers
  })
  const context = await createContext({
    config,
    namespace: `script:${namespace}`,
    serviceAccount: adminContext.serviceAccount,
    source: `${config.api.url}/sdk_account/${adminContext.serviceAccount.id}?script=true`,
    storage: adminContext.storage
  })
  const { logger } = context
  logger.debug('signing in with custom token')
  await signInWithIdToken(context, adminContext.token)

  return {
    adminContext,
    context
  }
}

export default setupScriptContexts
