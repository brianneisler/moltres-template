const getUserIdToken = async ({ auth }, user) => {
  let currentUser = user
  if (!currentUser) {
    if (!auth.currentUser) {
      return null
    }
    ;({ currentUser } = auth)
  }

  return await currentUser.getIdToken()
}

export default getUserIdToken
