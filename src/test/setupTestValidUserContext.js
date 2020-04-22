import { createContext } from '../context'
import { createCustomToken, signInWithCustomToken } from '../utils/auth'
import { registerValidUser } from '../service/auth'
import createTestContext from './createTestContext'

const setupTestValidUserContext = async (adminContext, serviceAccountContext) => {
  const { config, testRunId } = serviceAccountContext
  const { user } = await registerValidUser(serviceAccountContext, { phoneNumber: '9282356681' })
  const namespace = `test:${testRunId}.user:${user.id}`
  const source = `${config.api.url}/user/${user.id}?test=${testRunId}`

  if (config.test.integration) {
    const context = await createContext({
      config,
      currentUser: user,
      namespace,
      source,
      testRunId
    })
    const token = await createCustomToken(adminContext, user.id)
    await signInWithCustomToken(context, token)
    return context
  }
  return createTestContext({
    config,
    currentUser: user,
    namespace,
    source,
    storage: adminContext.storage,
    testAuth: {
      uid: user.id
    },
    testRunId
  })
}

export default setupTestValidUserContext
