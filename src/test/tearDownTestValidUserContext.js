import { prop } from 'ramda'

import { deleteValidUser } from '../sdk/auth'

const tearDownTestValidUserContext = async (testContext, userContext) => {
  try {
    if (userContext.currentUser) {
      await deleteValidUser(testContext, prop('id', userContext.currentUser))
    }
  } catch (error) {
    testContext.logger.error(error)
  }
  await userContext.app.delete()
}

export default tearDownTestValidUserContext
