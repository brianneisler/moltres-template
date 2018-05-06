import deleteUser from './deleteUser'
import initAdminApp from './initAdminApp'

const deleteTestUser = async (app) => {
  const adminApp = initAdminApp()
  const { testUser } = app
  return deleteUser(adminApp, testUser.uid)
}

export default deleteTestUser
