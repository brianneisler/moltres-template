import copyBufferToUint8Array from '../../utils/buffer/copyBufferToUint8Array'
import saveImageByteArray from './saveImageByteArray'

const saveImageFromBuffer = async (context, buffer, metadata) => {
  const byteArray = copyBufferToUint8Array(buffer)

  // TODO BRN: Look for Images that are the same as this one. If one
  // exists, return the existing image. Same could be same hash but would be
  // better to have a good image matching algorithm

  return saveImageByteArray(context, byteArray, metadata)
}

export default saveImageFromBuffer
