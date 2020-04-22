import createUserImage from './createUserImage'
import findUserImageByImageIdAndUserId from './findUserImageByImageIdAndUserId'

const findOrCreateUserImage = async (context, { imageId, userId }) => {
  const existingUserImage = await findUserImageByImageIdAndUserId(context, imageId, userId)
  if (existingUserImage) {
    return existingUserImage
  }
  return createUserImage(context, { imageId, userId })
}

export default findOrCreateUserImage
