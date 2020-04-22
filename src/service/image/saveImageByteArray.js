import { createImage, updateImage } from '../../db/Image'
import bufferToStream from '../../utils/buffer/bufferToStream'
import contentTypeToExtension from '../../utils/mime/contentTypeToExtension'
import getImageMeta from '../../utils/image/getImageMeta'
import hashStream from '../../utils/stream/hashStream'
import uploadFileByteArray from '../../utils/storage/uploadFileByteArray'

const saveImageByteArray = async (context, byteArray, metadata = {}) => {
  const { contentType } = metadata
  if (!contentType) {
    throw new Error('contentType metadata must be provided')
  }
  const ext = contentTypeToExtension(contentType)
  const hash = await hashStream(bufferToStream(byteArray))
  const { height, length, width } = getImageMeta(byteArray)

  // check for a previously existing image with the same hash.
  // If an image exists with the same hash, return that image instead. (this might be done outside of this method)

  const image = await createImage(context, {
    contentType,
    hash,
    height,
    length,
    storageBucket: context.config.firebase.storageBucket,
    width
  })

  const path = `images/${image.id}/${image.id}.${ext}`
  await uploadFileByteArray(context, byteArray, path, {
    ...metadata,
    contentType: image.contentType,
    hash: image.hash
  })

  return updateImage(context, image.id, {
    path
  })
}

export default saveImageByteArray
