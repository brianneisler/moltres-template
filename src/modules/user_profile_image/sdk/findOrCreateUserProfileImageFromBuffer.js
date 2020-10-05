import { saveImageFromBuffer } from '../../image'

import findOrCreateUserProfileImage from './findOrCreateUserProfileImage'

const findOrCreateUserProfileImageFromBuffer = async (
  context,
  { buffer, metadata, userId }
) => {
  const image = await saveImageFromBuffer(context, buffer, metadata)
  return findOrCreateUserProfileImage(context, { imageId: image.id, userId })
}

export default findOrCreateUserProfileImageFromBuffer
