import Promise from 'bluebird'
import { map } from 'ramda'
import deleteUser from './deleteUser'

// const deleteUidBatch = async (app, uidBatch) => Promise.all([
//   // firebase deleteUser API is rate limited to 10 per second
//   Promise.delay(1000),
//   Promise.all(map(
//     async (uid) => deleteUser(app, uid),
//     uidBatch
//   ))
// ])
//
// const deleteUsers = async (app, uids) => {
//   return Promise.map(
//     splitEvery(10, uids),
//     async (uidBatch) => deleteUidBatch(app, uidBatch),
//     { concurrency: 1 }
//   )
// }

const deleteUsers = async (app, uids) => Promise.all(map(
  async (uid) => deleteUser(app, uid),
  uids
))

export default deleteUsers
