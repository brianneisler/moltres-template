import { rate } from 'moltres-utils'

const deleteUser = rate(async (app, uid) => app.auth().deleteUser(uid), 10, 1000)

export default deleteUser
