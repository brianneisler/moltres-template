import { mapAll } from 'moltres-utils'
import deleteUser from './deleteUser'

const deleteTestUsers = async (testApp) => {
  const { adminApp, testUsers } = testApp
  return mapAll(async (testUser) => deleteUser(adminApp, testUser.uid), testUsers)
}

export default deleteTestUsers
