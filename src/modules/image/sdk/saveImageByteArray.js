import { bufferToStream, createBuffer } from 'moltres/buffer'
import { getImageMeta } from 'moltres/image'
import { contentTypeToExtension } from 'moltres/mime'
import { uploadFileByteArray } from 'moltres/storage'
import { hashStream } from 'moltres/stream'

import createImage from './createImage'
import updateImage from './updateImage'

const saveImageByteArray = async (context, byteArray, metadata = {}) => {
  const { contentType } = metadata
  if (!contentType) {
    throw new Error('contentType metadata must be provided')
  }
  const ext = contentTypeToExtension(contentType)
  const buffer = createBuffer(byteArray)
  const [hash, { height, length, width }] = await Promise.all([
    hashStream(bufferToStream(buffer)),
    getImageMeta(buffer)
  ])

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
