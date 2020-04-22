import createUserProfile from './createUserProfile'
import findUserProfileById from './findUserProfileById'
import updateUserProfile from './updateUserProfile'

const saveUserProfile = async (context, data) => {
  const existingUserProfile = await findUserProfileById(context, data.userId)
  if (existingUserProfile) {
    return updateUserProfile(context, data.userId, data)
  }
  return createUserProfile(context, data)
}

export default saveUserProfile
