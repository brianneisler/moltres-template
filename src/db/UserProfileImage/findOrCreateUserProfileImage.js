import createUserProfileImage from './createUserProfileImage'
import findUserProfileImageByImageIdAndUserId from './findUserProfileImageByImageIdAndUserId'

const findOrCreateUserProfileImage = async (context, { imageId, userId }) => {
  const existingUserProfileImage = await findUserProfileImageByImageIdAndUserId(
    context,
    imageId,
    userId
  )
  if (existingUserProfileImage) {
    return existingUserProfileImage
  }
  return createUserProfileImage(context, { imageId, userId })
}

export default findOrCreateUserProfileImage
