import deleteTestUser from './deleteTestUser'

const cleanupTestApp = async (app) => {
  const { namespace } = app
  await app
    .database()
    .ref(namespace)
    .remove()
  await deleteTestUser(app)
  app.database().goOffline()
}

export default cleanupTestApp
