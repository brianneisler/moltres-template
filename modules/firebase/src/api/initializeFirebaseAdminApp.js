import admin from 'firebase-admin'
import { prop } from 'moltres-utils'

const initializeFirebaseAdminApp = (name, configs) => {
  const config = prop(name, configs)
  const { serviceAccount, ...rest } = config
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...rest
  })
}

export default initializeFirebaseAdminApp
