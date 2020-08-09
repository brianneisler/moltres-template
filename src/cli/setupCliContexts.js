import { generateAdminConfig } from '../config'
import { createAdminContext, createContext } from '../context'
import { signInWithIdToken } from '../utils/auth'
import { isTestAppConfigured, loadEnv } from '../utils/config'
import { uuidv4 } from '../utils/lang'

const getStage = () => {
  if (process.env.STAGE) {
    // eslint-disable-next-line no-console
    console.log('found stage from process.env.STAGE:', process.env.STAGE)
    return process.env.STAGE
  }

  // eslint-disable-next-line no-console
  console.log('no stage found')
  return null
}

const setupCliContexts = async () => {
  loadEnv(process.cwd(), { stage: process.env.STAGE })
  const stage = getStage()
  const config = generateAdminConfig({
    stage
  })
  const namespace = uuidv4()
  const adminContext = await createAdminContext({
    config,
    namespace: `admin.cli:${namespace}`,
    source: `${config.api.url}/admin?cli=true` // TODO BRN: Attach mac/ip identifiers
  })

  const isTestApp = isTestAppConfigured(config)
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
  logger.info('signing in with custom token')
  await signInWithIdToken(context, adminContext.token)

  return {
    adminContext,
    context
  }
}

export default setupCliContexts
