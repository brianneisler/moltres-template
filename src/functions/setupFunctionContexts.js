import * as sms from '../notifications/sms'
import { createAdminContext, createContext } from '../context'
import { signInWithIdToken } from '../utils/auth'
import { uuidv4, weakMemoize } from '../utils/lang'

// NOTE BRN: We memoize this function so that when used to build the contexts on
// backend invocations, we always get the same context back after the first invocation
const setupFunctionContexts = weakMemoize(async (config, functionName) => {
  const namespace = uuidv4()
  const adminContext = await createAdminContext({
    config,
    namespace: `admin.function.${functionName}:${namespace}`,
    source: `${config.api.url}/function_boot?function=${functionName}`
  })
  const context = createContext({
    admin: adminContext,
    config,
    functionName,
    namespace: `function.${functionName}:${namespace}`,
    notifications: {
      sms
    },
    serviceAccount: adminContext.serviceAccount,
    source: `${config.api.url}/service_account/${adminContext.serviceAccount.id}?function=${functionName}`,
    storage: adminContext.storage
  })
  context.logger.info(`'${functionName}' function context created`)
  await signInWithIdToken(context, adminContext.token)
  context.logger.info('signed in with custom auth token')
  return {
    adminContext,
    context
  }
})

export default setupFunctionContexts
