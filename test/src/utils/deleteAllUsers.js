import { map } from 'ramda'
import deleteUsers from './deleteUsers'
import getUserUid from './getUserUid'
import listUsers from './listUsers'

const deleteAllUsers = async (app) => {
  const users = await listUsers(app)
  return deleteUsers(app, map(getUserUid, users))
}

export default deleteAllUsers
