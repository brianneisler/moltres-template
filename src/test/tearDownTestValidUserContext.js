import { getPoperty } from 'moltres'

import { deleteValidUser } from '../modules/auth'

const tearDownTestValidUserContext = async (testContext, userContext) => {
  try {
    if (userContext.currentUser) {
      await deleteValidUser(
        testContext,
        getPoperty('id', userContext.currentUser)
      )
    }
  } catch (error) {
    testContext.logger.error(error)
  }
  await userContext.app.delete()
}

export default tearDownTestValidUserContext
