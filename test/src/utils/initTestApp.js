import admin from 'firebase-admin' // eslint-disable-line import/no-extraneous-dependencies
import uuid from 'uuid/v1' // eslint-disable-line import/no-extraneous-dependencies
import createTestAnonymousUser from './createTestAnonymousUser'
// import deleteAllUsers from './deleteAllUsers'
import getServiceAccount from './getServiceAccount'
import initAdminApp from './initAdminApp'

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
//   databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
//   messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`
// }
// const initTestApp = (adminApp, namespace) =>
//   firebase.initializeApp(config, namespace)

const initTestApp = async () => {
  const adminApp = initAdminApp()

  // await deleteAllUsers(adminApp)
  const testUser = await createTestAnonymousUser(adminApp)
  const namespace = uuid()
  const serviceAccount = getServiceAccount()

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseAuthVariableOverride: {
      uid: testUser.uid
    },
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  }, namespace)

  const { database } = app
  app.database = (...args) => {
    const result = database.call(app, ...args)
    result.namespace = namespace
    return result
  }
  app.namespace = namespace
  app.testUser = testUser

  return app
}

export default initTestApp
