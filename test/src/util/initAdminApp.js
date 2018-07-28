import admin from 'firebase-admin' // eslint-disable-line import/no-extraneous-dependencies
import getServiceAccount from './getServiceAccount'

let app
const initAdminApp = () => {
  if (!app) {
    const serviceAccount = getServiceAccount()
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    })
  }
  return app
}

export default initAdminApp
