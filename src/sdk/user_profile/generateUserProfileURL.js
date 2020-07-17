const generateUserProfileURL = (context, { userId, userProfile }) => {
  if (userProfile) {
    ;({ userId } = userProfile)
  }
  if (!userId) {
    throw new Error('userProfile or userId must be provided')
  }
  return `${context.config.app.url}/user/${userId}`
}

export default generateUserProfileURL
