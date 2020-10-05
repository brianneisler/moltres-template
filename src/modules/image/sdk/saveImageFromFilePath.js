import { copyBufferToUint8Array, streamToBuffer } from '../../../utils/buffer'
import { createReadStream } from '../../../utils/fs'
import { filePathToContentType } from '../../../utils/mime'

import saveImageByteArray from './saveImageByteArray'

const saveImageFromFilePath = async (context, filePath) => {
  const fileStream = createReadStream(filePath)
  const buffer = await streamToBuffer(fileStream)
  const byteArray = copyBufferToUint8Array(buffer)

  // TODO BRN: Look for Images that are the same as this one. If one
  // exists, return the existing image. Same could be same hash but would be
  // better to have a good image matching algorithm
  const contentType = filePathToContentType(filePath)

  return saveImageByteArray(context, byteArray, { contentType })
}

export default saveImageFromFilePath
