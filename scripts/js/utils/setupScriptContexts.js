import { signInWithIdToken } from 'moltres/auth'
import { loadProjectConfig } from 'moltres/config'
import { createAdminContext, createBaseContext } from 'moltres/context'
import { uuidv4 } from 'moltres/lang'
import { pathResolve } from 'moltres/path'

const setupScriptContexts = async () => {
  const config = await loadProjectConfig({
    cwd: pathResolve(__dirname, '..', '..', '..'),
    target: 'script'
  })
  const namespace = uuidv4()
  const adminContext = await createAdminContext({
    config,
    namespace: `admin.script:${namespace}`,
    source: `${config.api.url}/admin?script=true` // TODO BRN: Attach script identifiers
  })
  const context = await createBaseContext({
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
