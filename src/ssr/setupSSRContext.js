import { createContext } from '../context'
import * as component from '../notifications/component'
import { uuidv4 } from '../utils/lang'

const setupSSRContext = (config, serviceAccountContext, history) => {
  const { cache, currentUser, serviceAccount } = serviceAccountContext
  return createContext({
    cache,
    config,
    // TODO BRN: Simply passing the current user into the context here doesn't
    // set the store into the proper configuration. We'll need to actually
    // authenticate the engine's auth with that user in order to properly
    // configure all systems.
    currentUser,
    history,
    logger: serviceAccountContext.logger,
    // NOTE BRN: We want to separate this into a different namespace so that
    // when firebase is started up there's no overlap with the request context
    // which is logged in as a ServiceAccount
    namespace: currentUser
      ? `ssr.user:${currentUser.id}`
      : `ssr.anonymous:${uuidv4()}`,
    notifications: {
      component
    },
    serviceAccount,
    source: `${config.api.url}/sdk_account/${serviceAccountContext.serviceAccount.id}?ssr=true`
  })
}

export default setupSSRContext
