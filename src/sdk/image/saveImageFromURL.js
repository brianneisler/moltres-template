import copyBufferToUint8Array from '../../utils/buffer/copyBufferToUint8Array'
import fetch from '../../utils/request/fetch'
import isURL from '../../utils/url/isURL'

import saveImageByteArray from './saveImageByteArray'

const saveImageFromURL = async (context, imageUrl) => {
  if (!isURL(imageUrl)) {
    throw new Error(`${imageUrl} is not a url`)
  }
  const response = await fetch(imageUrl)

  if (response.status >= 400) {
    throw new Error(`Could not download image from ${imageUrl}`)
  }

  const buffer = await response.arrayBuffer()
  const byteArray = copyBufferToUint8Array(buffer)

  // TODO BRN: Look for Images that are the same as this one. If one
  // exists, return the existing image. Same could be same hash but would be
  // better to have a good image matching algorithm
  const contentType = response.headers.get('content-type')

  return saveImageByteArray(context, byteArray, { contentType })
}

export default saveImageFromURL
