import deleteTestUsers from './deleteTestUsers'

const cleanupTestApp = async (app) => {
  const { namespace } = app
  await app
    .database()
    .ref(namespace)
    .remove()
  await deleteTestUsers(app)
}

export default cleanupTestApp
