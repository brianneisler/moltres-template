import { createReadStream } from 'fs-extra'
import copyBufferToUint8Array from '../../utils/buffer/copyBufferToUint8Array'
import filePathToContentType from '../../utils/mime/filePathToContentType'
import saveImageByteArray from './saveImageByteArray'
import streamToBuffer from '../../utils/buffer/streamToBuffer'

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
