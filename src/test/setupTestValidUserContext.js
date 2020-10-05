import { createContext } from '../context'
import { registerValidUser } from '../modules/auth'
import { createCustomToken, signInWithIdToken } from '../utils/auth'
import { isTestAppConfigured } from '../utils/config'

const setupTestValidUserContext = async (
  adminContext,
  serviceAccountContext
) => {
  const { config } = adminContext
  const { runId } = config.test
  const { user } = await registerValidUser(serviceAccountContext, {
    phoneNumber: '9282356681'
  })
  const namespace = `test:${runId}.user:${user.id}`
  const source = `${config.api.url}/user/${user.id}?test=${runId}`
  const isTestApp = isTestAppConfigured(config)

  // TODO BRN: Instead of doing this testAuth config up front. When we are
  // testing or emulating, we should mock the auth implementation and have that
  // dynamically update the context by applying the auth settings
  let testAuth
  if (isTestApp) {
    testAuth = {
      uid: user.id
    }
  }

  const context = await createContext({
    config,
    currentUser: user,
    namespace,
    source,
    storage: adminContext.storage,
    testAuth
  })

  if (!isTestApp) {
    const token = await createCustomToken(adminContext, user.id)
    await signInWithIdToken(context, token)
  }
  return context
}

export default setupTestValidUserContext
