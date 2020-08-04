import { generateAdminConfig } from '../../../src/config'
import { createAdminContext, createContext } from '../../../src/context'
import { signInWithIdToken } from '../../../src/utils/auth'
import { loadEnv } from '../../../src/utils/config'
import { uuidv4 } from '../../../src/utils/lang'
import { pathResolve } from '../../../src/utils/path'

const setupScriptContexts = async () => {
  const env = loadEnv(pathResolve(__dirname, '..', '..', '..'), {
    stage: process.env.STAGE
  })
  const config = generateAdminConfig()
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
  logger.info('signing in with custom token')
  await signInWithIdToken(context, adminContext.token)

  return {
    adminContext,
    context,
    env
  }
}

export default setupScriptContexts
