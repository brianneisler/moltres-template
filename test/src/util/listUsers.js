const listUsers = async (app) => {
  const { users } = await app.auth().listUsers()
  return users
}

export default listUsers
